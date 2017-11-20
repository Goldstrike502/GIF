import { CHATEAU_ROUTE_URL, OMGEVING_ROUTE_URL, VILLAS_ROUTE_URL } from '../Routes';
import { ChateauPost, PriceRange, PriceRangeStyles, VillaContentModel } from '../Types/ContentTypes';
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
        items: state.villas.map(toSitemap(VILLAS_ROUTE_URL))
      },
      {
        title: `Chateau Cazaleres`,
        items: state.chateauPosts.filter((post, i) => i < 7).map(toSitemap(CHATEAU_ROUTE_URL))
      },
      {
        title: `Omgeving`,
        items: state.omgeving.markers.map(toSitemap(OMGEVING_ROUTE_URL))
      }
    ]
  };
}
export function toSitemap(parentSlug: string): (content: { title: string, slug: string }) => SitemapItem {
  return (content: { title: string, slug: string }) => {
    return {
      title: content.title,
      link: `${parentSlug}/${content.slug}`
    };
  };
}

export function hasDayCalandarStyles(prices: PriceRange[], day: Moment, style: PriceRangeStyles): Boolean {
  return prices.find(price => (price.styles.indexOf(style) !== -1) &&
    (day.isSameOrAfter(price.vanaf) && day.isSameOrBefore(price.tot))) ? true : false;
}