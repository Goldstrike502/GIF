import { getAllContentTypesAsSitemap } from '../Selectors';
import { StoreState } from '../Types';
import { Sitemap } from '../Types/index';
import * as React from 'react';
import { connect } from 'react-redux';
import './Footer.css';
import { Link } from 'react-router-dom';
export const initialFooterSitemap: Sitemap = {
  items: [{
    title: 'Loading footer',
    items: []
  }]
};

function mapStateToProps(state: StoreState): FooterProps {
  return {sitemap: getAllContentTypesAsSitemap(state)};
}

interface FooterProps {
  sitemap: Sitemap;
}
export function FooterComponent(props: FooterProps) {
  return (
  <footer>
      <section className="sitemap">
        <h1>Goed in Frankrijk</h1>
        {props.sitemap.items.map((branch) => {
        return (
          <div className="branch" key={branch.title}>
              <h2>{branch.title}</h2>
            <ul>
              {branch.items.map(sub => <li key={sub.title}><Link to={`${sub.link}`}>{sub.title}</Link></li>)}
            </ul> 
          </div>
          );

        })}
      </section>
  </footer>
  );
}
export const Footer = connect(mapStateToProps, () => {
  return {};
})(FooterComponent);