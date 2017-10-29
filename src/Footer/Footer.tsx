import * as React from 'react';

export interface SitemapItem {
  title: string;
  to: string;
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
export const Footer: React.StatelessComponent<FooterProps> = props => {
  return (
  <footer>
      <section className="sitemap">
        <h3>Chateau Cazaleres</h3>
        <ul>
          <li>a</li>
        </ul>
      </section>
  </footer>
  );
};