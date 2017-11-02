import { Photo, SitemapBranch } from '../Types/index';
import * as constants from '../Constants';

export interface GetSliderPhotos {
    type: constants.GET_SLIDER_PHOTOS;
    villa?: string;
}

export interface GetChateauPosts {
    type: constants.GET_CHATEAU_POSTS;
    amount?: number;
}

export interface ReceivedFooterSitemap {
    type: constants.RECEIVED_FOOTER_SITEMAP_ITEMS;
    branch: SitemapBranch;
}
export interface ReceivedSliderPhotos {
    type: constants.RECEIVED_SLIDER_PHOTOS;
    photos: Photo[];
}

export type PhotoSliderActions = GetSliderPhotos | ReceivedSliderPhotos;
export type FooterActions = ReceivedFooterSitemap;

export function GetSliderPhotos(villa?: string): GetSliderPhotos {
    return {
        type: constants.GET_SLIDER_PHOTOS,
        villa
    };
}

export function getChateauPosts(amount?: number)  {
    return {
        type: constants.GET_CHATEAU_POSTS,
        amount
    };
}
export function ReceivedSliderPhotos(photos: Photo[]): ReceivedSliderPhotos {
    return {
        type: constants.RECEIVED_SLIDER_PHOTOS,
        photos
    };
}
