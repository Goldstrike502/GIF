import { Sitemap } from './Types/index';
import { ContentfulClient } from './Contentful';
import { Footer } from './Footer/Footer';
import { Provider } from 'react-redux';
import { VillaPage } from './Pages/Villa/Villa';
import { ChateauPage } from './Pages/Chateau/Chateau';
import { ConnectedRouter } from 'react-router-redux';

import { Home } from './Pages/Home';
import * as React from 'react';
import './App.css';
import 'whatwg-fetch';

import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { configureStore, history } from './Store';
import { OmgevingPage } from './Pages/Omgeving/OmgevingPage';
import { ContactPageComponent } from './Pages/Contact/ContactPage';
import { CHATEAU_ROUTE_URL, CONTACT_ROUTE_URL, OMGEVING_ROUTE_URL, VILLAS_ROUTE_URL } from './Routes';
interface Props {
}
interface State {
  footerSitemap: Sitemap;
}
class App extends React.Component<Props, State> {
  client = ContentfulClient;
  state = {
    footerSitemap: {
      items: [{
        title: 'Loading footer',
        items: []
      }]
    }
  };

  constructor() {
    super();

  }

  render() {
    return (
      <div className="App">
        <Router>
          <Provider store={configureStore()}>
            <ConnectedRouter history={history}>
              <div>
                <nav>
                  <span className="brand">Goed in Frankrijk</span>
                  <ul>
                    <li><NavLink to="/">Homepage</NavLink></li>
                    <li><NavLink to={CHATEAU_ROUTE_URL}>Chateau</NavLink></li>
                    <li><NavLink to={`${VILLAS_ROUTE_URL}/espace`}>Villa's</NavLink></li>
                    <li><NavLink to={OMGEVING_ROUTE_URL}>Omgeving</NavLink></li>
                    <li><NavLink to={CONTACT_ROUTE_URL}>Contact</NavLink></li>
                  </ul>
                </nav>

                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path={CHATEAU_ROUTE_URL} component={ChateauPage} />
                <Route exact={true} path={OMGEVING_ROUTE_URL} component={OmgevingPage} />
                <Route exact={true} path={CONTACT_ROUTE_URL} component={ContactPageComponent} />
                <Route path={`${CHATEAU_ROUTE_URL}/:post`} component={ChateauPage} />
                <Route path={`${VILLAS_ROUTE_URL}/:villa`} component={VillaPage} />
                <Route path={`${OMGEVING_ROUTE_URL}/:item`} component={OmgevingPage} />
                {!!this.state && !!this.state.footerSitemap ? <Footer/> : ''}
              </div>  
            </ConnectedRouter>
          </Provider>
        </Router>
      </div>
    );
  }
}

export default App;
