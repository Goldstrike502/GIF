import { Sitemap } from '../Types/index';
import * as React from 'react';

export const initialFooterSitemap: Sitemap = {
  items: [{
    title: 'Loading footer',
    items: []
  }]
};

interface FooterProps {
  sitemap: Sitemap;
}
export function Footer(props: FooterProps) {
  return (
  <footer>
      <section className="sitemap">
        {props.sitemap.items.map((branch) => {
        return (
          <div className="branch" key={branch.title}>
              <h3>{branch.title}</h3>
            <ul>
              {branch.items.map(sub => <li key={sub.title}>{sub.title}</li>)}
            </ul>
          </div>
          );

        })}
      </section>
  </footer>
  );
}