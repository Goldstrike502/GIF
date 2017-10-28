import { VillaCompactView } from './Villa/Villa';
import { PhotoSlider } from '../photoslider/Photoslider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import * as React from 'react';
import './Home.css';
import { ChateauItem, ChateauListViewComponent, ChateauPost } from './Chateau/Chateau';
import { CHATEAU_CONTENT_TYPE_ID, ContentfulClient, SLIDER_PHOTO_CONTENT_TYPE_ID } from '../Contentful';
import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import { Photo, SliderPhotoContentModel } from '../photoslider/Types';
interface State {
  introClosed: boolean;
  chateauPosts?: Entry<ChateauPost>[];
  sliderPhotos?: Photo[];
}

export class Home extends React.Component<{}, State> {
  client: ContentfulClientApi = ContentfulClient;
  state = {
    introClosed: false,
    chateauPosts: [],
    sliderPhotos: [],
  };
  constructor() {
    super();
    this.initPhotoSliderContentState();
    this.initChateauContentState();
  }

  initPhotoSliderContentState() {
    return this.client.getEntries({ content_type: SLIDER_PHOTO_CONTENT_TYPE_ID,
      'fields.page.sys.id[all]': 'CpAKWj8P7iWggMwIkm4K2'})
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

  initChateauContentState(): Promise<EntryCollection<ChateauPost>> {
    return this.client.getEntries({ content_type: CHATEAU_CONTENT_TYPE_ID })
      .then((content) => {
        this.setState({ ...this.state, chateauPosts: content.items });
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
        <ChateauListViewComponent>
          {this.state.chateauPosts
            .map((item: Entry<ChateauPost>) => <ChateauItem key={item.fields.slug} item={item} />)}
        </ChateauListViewComponent>
        <VillaCompactView>
          <Tabs>
            <TabList>
              <Tab>Title 1</Tab>
              <Tab>Title 2</Tab>
            </TabList>

            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
          </Tabs>
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