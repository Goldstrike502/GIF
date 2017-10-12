import { Home } from './Pages/Home';
import * as React from 'react';
import './App.css';
import 'whatwg-fetch';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <nav>
            <span className="brand">Goed in Frankrijk</span>
            <ul>
              <li><Link to="/">Homepage</Link></li>
              <li><Link to="/">Chateau</Link></li>
              <li><Link to="/">Villa's</Link></li>
              <li><Link to="/">Omgeving</Link></li>
              <li><Link to="/">Boeken</Link></li>
              <li><Link to="/">Contact</Link></li>
            </ul>
          </nav>
          <Route exact={true} path="/" component={Home}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
