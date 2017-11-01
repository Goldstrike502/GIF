import * as React from 'react';
import { Link } from 'react-router-dom';

export interface SitemapItem {
  title: string;
  link: Link;
}
export interface SitemapBranch {
  title: string;
  items: SitemapItem[];
}
export interface Sitemap {
  items: SitemapBranch[];
}
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