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
      <section className="social">
        <div 
          className="fb-page" 
          // tslint:disable-next-line:jsx-alignment
          // tslint:disable-next-line:jsx-alignment
          // tslint:disable-next-line:max-line-length
          // tslint:disable-next-line:jsx-alignment
          data-href="https://www.facebook.com/goedinfrankrijk/" data-tabs="timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/goedinfrankrijk/" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/goedinfrankrijk/">Goed in Frankrijk</a></blockquote></div>
      </section>
  </footer>
  );
}
export const Footer = connect(mapStateToProps, () => {
  return {};
})(FooterComponent);