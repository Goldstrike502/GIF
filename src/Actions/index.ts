import { Sitemap } from '../Types';
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

export interface GetWebsiteContent {
    type: constants.GET_WEBSITE_CONTENT;
}

export interface ReceivedFooterSitemap {
    type: constants.RECEIVED_FOOTER_SITEMAP;
    sitemap: Sitemap;
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

export function getSliderPhotos(villa?: string): GetSliderPhotos {
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
export function receivedSliderPhotos(photos: Photo[]): ReceivedSliderPhotos {
    return {
        type: constants.RECEIVED_SLIDER_PHOTOS,
        photos
    };
}

export function receivedFooterSitemap(sitemap: Sitemap) {
    return {
        type: constants.RECEIVED_FOOTER_SITEMAP,
        sitemap
    };
}
export type LayoutActions = CloseIntro
;
export function closeIntro(): CloseIntro {
    return {
        type: constants.CLOSE_INTRO_MESSAGE
    };
}
export function getWebsiteContent(): GetWebsiteContent {
    return {
        type: constants.GET_WEBSITE_CONTENT
    };
}