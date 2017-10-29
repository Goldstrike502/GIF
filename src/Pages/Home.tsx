import { ChateauItem, ChateauListViewComponent } from './Chateau/ChateauList';
import { ChateauPost } from './Chateau/Types';
import { VillaCompactView, VillaFaciliteiten } from './Villa/Villa';
import { PhotoSlider } from '../photoslider/Photoslider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import * as ReactMarkdown from 'react-markdown';
import * as React from 'react';
import './Home.css';
import {
  CHATEAU_CONTENT_TYPE_ID,
  ContentfulClient,
  SLIDER_PHOTO_CONTENT_TYPE_ID,
  VILLAS_CONTENT_TYPE_ID,
} from '../Contentful';
import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import { Photo, SliderPhotoContentModel } from '../photoslider/Types';
import { Link } from 'react-router-dom';
interface State {
  introClosed: boolean;
  chateauPosts?: ChateauPost[];
  sliderPhotos?: Photo[];
  villaFaciliteiten?: VillaFaciliteiten[];
}

export class Home extends React.Component<{}, State> {
  client: ContentfulClientApi = ContentfulClient;
  state = {
    introClosed: false,
    chateauPosts: [],
    sliderPhotos: [],
    villaFaciliteiten: []
  };
  constructor() {
    super();
    this.initPhotoSliderContentState();
    this.initChateauContentState();
    this.initVillaFaciliteitenState();
  }
  initVillaFaciliteitenState() {
    return this.client.getEntries({
      content_type: VILLAS_CONTENT_TYPE_ID,
      select: ['fields.faciliteiten,fields.title,fields.prijsVanaf,fields.slug']
    })
      .then(entries => entries.items.map((villa: Entry<VillaFaciliteiten>) => {
        return {
          ... villa.fields
        };
      }))
      .then((faciliteiten) => {
        this.setState({
          ... this.state,
          villaFaciliteiten: faciliteiten
        });
      });
  }
  initPhotoSliderContentState() {
    return this.client.getEntries({
      content_type: SLIDER_PHOTO_CONTENT_TYPE_ID,
      'fields.homepage': true
    })
      .then((content: EntryCollection<SliderPhotoContentModel>) => content.items.map(photo => {
        return {
          original: photo.fields.image.fields.file.url,
          thumbnail: photo.fields.image.fields.file.url
        };
      }))
      .then((photos) => {
        this.setState({ ...this.state, sliderPhotos: photos });
        return photos;
      });
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
  render() {
    return (
      <div className="container">
        <section className="image-intro">
          {this.renderIntroHeader()}
          <PhotoSlider
            items={this.state.sliderPhotos}
            closed={this.state.introClosed}
            onClose={() => this.onIntroClose()}
          />
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
  renderIntroHeader() {
    return (
      <header className={this.state.introClosed ? 'hidden' : ''}>
        <span className="close" onClick={() => this.onIntroClose()}>X</span>
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
}