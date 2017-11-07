import { Photo } from '../Types/index';
import * as constants from '../Constants';

export interface GetSliderPhotos {
    type: constants.GET_SLIDER_PHOTOS;
    villa?: string;
}

export interface GetChateauPosts {
    type: constants.GET_CHATEAU_POSTS;
    amount?: number;
}

export interface GetFooterSitemap {
    type: constants.GET_FOOTER_SITEMAP;
}

export interface ReceivedFooterSitemap {
    type: constants.RECEIVED_FOOTER_SITEMAP_ITEMS;    
}
export interface ReceivedSliderPhotos {
    type: constants.RECEIVED_SLIDER_PHOTOS;
    photos: Photo[];
}

export interface CloseIntro {
    type: constants.CLOSE_INTRO_MESSAGE;
}

export type PhotoSliderActions = GetSliderPhotos | ReceivedSliderPhotos;
export type FooterActions = ReceivedFooterSitemap | GetFooterSitemap;

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

export type LayoutActions = CloseIntro
;
export function closeIntro(): CloseIntro {
    return {
        type: constants.CLOSE_INTRO_MESSAGE
    };
}