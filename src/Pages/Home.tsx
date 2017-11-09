import { closeIntro } from '../Actions';
import { getSliderPhotos } from '../Actions/index';
import { ChateauPost, StoreState } from '../Types/index';
import { ChateauItem, ChateauListViewComponent } from './Chateau/ChateauList';
import { VillaCompactView, VillaFaciliteiten } from './Villa/Villa';
import { BackgroundPhotoSlider } from '../photoslider/Photoslider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as ReactMarkdown from 'react-markdown';
import * as React from 'react';
import './Home.css';
import {
  CHATEAU_CONTENT_TYPE_ID,
  ContentfulClient
} from '../Contentful';
import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface State {
  introClosed: boolean;
  chateauPosts?: ChateauPost[];
  villaFaciliteiten?: VillaFaciliteiten[];
}
interface Props {
  onLoadHomepageContent: () => any;
  onIntroClose: () => void;
  introClosed: boolean;
}
function mapDispatchToProps(dispatch: Dispatch<StoreState>): Partial<Props> {
  return {
    onLoadHomepageContent: () => dispatch(getSliderPhotos()),
    onIntroClose: () => dispatch(closeIntro())
  };
}
function mapStateToProps(state: StoreState): Props {
  return {
    onLoadHomepageContent: () => undefined,
    onIntroClose:  () => undefined,
    introClosed: state.layout.introClosed
  };
}
class HomePage extends React.Component<Props, State> {
  client: ContentfulClientApi = ContentfulClient;
  state = {
    introClosed: false,
    chateauPosts: [],
    villaFaciliteiten: []
  };
  constructor() {
    super();    
    this.initChateauContentState();
  }

  initChateauContentState() {
    return this.client.getEntries({ content_type: CHATEAU_CONTENT_TYPE_ID })
      .then((entries: EntryCollection<ChateauPost>) => entries.items.map((post: Entry<ChateauPost>) => {
        return post.fields;
      }))
      .then((content) => {
        this.setState({ ...this.state, chateauPosts: content });
        return content;
      });
  }
  componentWillMount() {
    if (this.props.onLoadHomepageContent) {
      this.props.onLoadHomepageContent();
    }
  }
  renderIntroHeader() {
    return (
      <header className={this.props.introClosed ? 'hidden' : ''}>
        <span className="close" onClick={() => this.props.onIntroClose()}>X</span>
        <figure>
          <img src="./logo.png" alt="Logo" />
          <h1><span>Goed in</span> Frankrijk</h1>
        </figure>
        <hr />
        <ul>
          <li>Kindvriendelijk</li>
          <li>Luxe vakantie-villa's</li>
          <li>Persoonlijk contact</li>
        </ul>
        <p>Zeven eigenaren van luxe vakantie-villa's
          gelegen in Zuid-Frankrijk hebben zich verenigd in een stichting.
          Dit om zich te kunnen onderscheiden in mooie en luxe ingerichte villa's met een
          echt thuisgevoel. Wij zijn er voor uw gemakken en een mooie vakantie.
        </p>
      </header>
    );
  }
  render() {
    return (
      <div className="container">
        <section className="image-intro">
          {this.renderIntroHeader()}
          <BackgroundPhotoSlider />
        </section>
        <ChateauListViewComponent intro={true}>
          {this.state.chateauPosts
            .map((item: ChateauPost) => <ChateauItem key={item.slug} item={item} />)}
      </ChateauListViewComponent>
        <VillaCompactView>
          {this.state.villaFaciliteiten.length > 0 ?
            <Tabs defaultIndex={0} >
              <TabList>
                {this.state.villaFaciliteiten.map((faciliteiten: VillaFaciliteiten, i) =>
                  <Tab key={faciliteiten.id} tabIndex={i.toString()}> {faciliteiten.title}</Tab>)}
              </TabList>

              {this.state.villaFaciliteiten.map((faciliteiten: VillaFaciliteiten, i) =>
                <TabPanel key={faciliteiten.id}>
                  <ReactMarkdown source={faciliteiten.faciliteiten} />
                  <div className="villa-actions">
                    <Link 
                      to={'/vakantie-villas/' + faciliteiten.slug} 
                      className="button yellow"
                    > Villa informatie & beschikbaarheid 
                    </Link>
                    <span className="prijs"><span>Vanaf </span> {faciliteiten.prijsVanaf} <span> per week</span></span>
                  </div>
                </TabPanel>)}
            </Tabs>
            : ''}
        </VillaCompactView>
        <section>Villa</section>
        <section>Omgeving</section>
        <button className="button">Meer informatie</button>
      </div>
    );
  }
  onIntroClose() {
    this.setState({ introClosed: true });
  }
}
export const Home = connect((state) => mapStateToProps, 
                            mapDispatchToProps)(HomePage);
