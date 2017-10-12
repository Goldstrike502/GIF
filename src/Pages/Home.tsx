import * as React from 'react';
import './Home.css';

export class Home extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div><img src="./logo.png" alt="Logo"/> & intro</div>
          Photoslider
        </header>
        <section>Chateau</section>
        <section>Villa</section>
        <section>Omgeving</section>
      </div>
      );
  }
}