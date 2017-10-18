import { Photo } from '../photoslider/Types';
import { PhotoSlider } from '../photoslider/Photoslider';
import * as React from 'react';
import './Home.css';

interface State {
  introClosed: boolean;
}

export class Home extends React.Component<{}, State> {
  images: Photo[] = [
    {
      original: 'http://lorempixel.com/1000/600/nature/1/',
      thumbnail: 'http://lorempixel.com/250/150/nature/1/',
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/2/',
      thumbnail: 'http://lorempixel.com/250/150/nature/2/'
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/3/',
      thumbnail: 'http://lorempixel.com/250/150/nature/3/'
    }
  ];
  state = {
    introClosed: false,
  };
  render() {
    return (
      <div className="container">
        <section className="image-intro">
          {this.renderIntroHeader()}
          <PhotoSlider items={this.images} closed={this.state.introClosed} onClose={() => this.onIntroClose()} />
        </section>
        <section>Chateau</section>
        <section>Villa</section>
        <section>Omgeving</section>
        <button className="button">Meer informatie</button>     
      </div>
    );
  }
  onIntroClose() {
    this.setState({introClosed: true});
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