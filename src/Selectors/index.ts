import { ChateauPost, PriceRange, VillaContentModel } from '../Types/ContentTypes';
import { Sitemap, SitemapItem, StoreState } from '../Types';
import { Moment } from 'moment';
export function getCurrentRoute(state: StoreState): string | false {
  return state.router.location ? state.router.location.pathname : false;
}
export function getCurrentVillaForRoute(state: StoreState, route: string | false): VillaContentModel | undefined {
  if (route) {
    return state.villas.find(villa => route.endsWith(villa.slug));
  }
  return undefined; 
}
export function getChateauPostForRoute(state: StoreState, route: string | false): ChateauPost | undefined {
  if (route) {
    return state.chateauPosts.find(post => route.endsWith(post.slug));
  }

  return undefined;
}
export function getHeaderPhotoFromCurrentChateauPost(
                               currentChateauPost: ChateauPost | undefined,
                               defaultPhoto: string = '/images/uploads/chateau.jpg') {
  return currentChateauPost ? currentChateauPost.cover.fields.file.url || defaultPhoto : defaultPhoto;
}
export function getAllContentTypesAsSitemap(state: StoreState): Sitemap {
  return {
    items: [
      {
        title: `Villa's`,
        items: state.villas.map(villa => toSitemap(villa))
      },
      {
        title: `Chateau Cazaleres`,
        items: state.chateauPosts.filter((post, i) => i < 7).map(toSitemap)
      }
    ]
  };
}
export function toSitemap(content: {title: string, slug: string}): SitemapItem {
  return {
    title: content.title,
    link: content.slug
  };
}

export function hasDayCalandarStyles(prices: PriceRange[], day: Moment, style: string): Boolean {
  return prices.find(price => day.isBetween(price.vanaf, price.tot)
                      && price.styles.find(s => s === style) ? true : false) ? true : false;
}