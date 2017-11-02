import { Sitemap } from './Types/index';
import { ContentfulClient } from './Contentful';
import { Footer } from './Footer/Footer';
import { Provider } from 'react-redux';
import { VillaPage } from './Pages/Villa/Villa';
import { ChateauPage } from './Pages/Chateau/Chateau';
import { Home } from './Pages/Home';
import { store } from './Store';
import * as React from 'react';
import './App.css';
import 'whatwg-fetch';

import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
interface Props { 
}
interface State {
  footerSitemap: Sitemap;
}
class App extends React.Component<Props, State> {
  client = ContentfulClient;
  state = { footerSitemap: {
    items: [{
      title: 'Loading footer',
      items: []
    }]
  }};
  render() {
    return (
      <div className="App">
        <Router>
        <Provider store={store}>

          <div>
          <nav>
            <span className="brand">Goed in Frankrijk</span>
            <ul>
              <li><NavLink to="/">Homepage</NavLink></li>
              <li><NavLink to="/chateau">Chateau</NavLink></li>
              <li><NavLink to="/vakantie-villas/espace">Villa's</NavLink></li>
              <li><NavLink to="/omgeving">Omgeving</NavLink></li>
              <li><NavLink to="/boeken">Boeken</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/chateau" component={ChateauPage}/>
          <Route path="/chateau/:post" component={ChateauPage}/>
          <Route path="/vakantie-villas/:villa" component={VillaPage}/>
          {!!this.state && !!this.state.footerSitemap ? <Footer sitemap={this.state.footerSitemap} /> : ''}
          </div>
          </Provider>
        </Router>
      </div>
    );
  }
}

export default App;
