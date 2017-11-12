import { ChateauPost, VillaFaciliteiten } from '../Types/ContentTypes';
import { closeIntro } from '../Actions';
import { StoreState } from '../Types/index';
import { ChateauItem, ChateauListViewComponent } from './Chateau/ChateauList';
import { VillaCompactView } from './Villa/Villa';
import { BackgroundPhotoSlider } from '../photoslider/Photoslider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as ReactMarkdown from 'react-markdown';
import * as React from 'react';
import './Home.css';
import {
  ContentfulClient
} from '../Contentful';
import { ContentfulClientApi } from 'contentful';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface State {
  introClosed: boolean;
  chateauPosts?: ChateauPost[];
}
interface Props {
  onLoadHomepageContent: () => any;
  onIntroClose: () => void;
  introClosed: boolean;
  villaFaciliteiten?: VillaFaciliteiten[];
  chateauPosts: ChateauPost[];
}
function mapDispatchToProps(dispatch: Dispatch<StoreState>): Partial<Props> {
  return {
    onIntroClose: () => dispatch(closeIntro())
  };
}
function mapStateToProps(state: StoreState): Props {
  return {
    onLoadHomepageContent: () => undefined,
    onIntroClose:  () => undefined,
    introClosed: state.layout.introClosed,
    chateauPosts: state.chateauPosts,
    villaFaciliteiten: state.villas
  };
}
class HomePage extends React.Component<Props, State> {
  client: ContentfulClientApi = ContentfulClient;
  state = {
    introClosed: false,
  };

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
          {this.props.chateauPosts
            .map((item: ChateauPost) => <ChateauItem key={item.slug} item={item} />)}
      </ChateauListViewComponent>
        <VillaCompactView>
          {this.props.villaFaciliteiten && this.props.villaFaciliteiten.length > 0 ?
            <Tabs defaultIndex={0} >
              <TabList>
                {this.props.villaFaciliteiten.map((faciliteiten: VillaFaciliteiten, i) =>
                  <Tab key={faciliteiten.id} tabIndex={i.toString()}> {faciliteiten.title}</Tab>)}
              </TabList>

              {this.props.villaFaciliteiten.map((faciliteiten: VillaFaciliteiten, i) =>
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
      </div>
    );
  }
  onIntroClose() {
    this.setState({ introClosed: true });
  }
}
export const Home = connect((state) => mapStateToProps, 
                            mapDispatchToProps)(HomePage);
