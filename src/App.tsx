import { Home } from './Pages/Home';
import * as React from 'react';
import './App.css';
import 'whatwg-fetch';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <nav>
            <span className="brand">Goed in Frankrijk</span>
            <ul>
              <li><NavLink to="/">Homepage</NavLink></li>
              <li><NavLink to="/chateau">Chateau</NavLink></li>
              <li><NavLink to="/vakantie-villas">Villa's</NavLink></li>
              <li><NavLink to="/omgeving">Omgeving</NavLink></li>
              <li><NavLink to="/boeken">Boeken</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </nav>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/chateau" component={Home}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
