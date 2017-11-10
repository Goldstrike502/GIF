import { ChateauPost, VillaContentModel } from '../Types/ContentTypes';
import { StoreState } from '../Types';
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