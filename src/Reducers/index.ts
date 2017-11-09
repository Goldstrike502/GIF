import { LayoutActions } from '../Actions';
import { FooterState, LayoutState } from '../Types';
import { initialPhotoSliderState } from '../photoslider/Photoslider';
import { PhotoSliderActions, FooterActions } from '../Actions/index';
import { Photo, StoreState } from '../Types/index';
import { combineReducers } from 'redux';
import * as constants from '../Constants';
import { CLOSE_INTRO_MESSAGE } from '../Constants';

function sliderPhotos(state: Photo[] = initialPhotoSliderState, action: PhotoSliderActions): Photo[] {
    switch (action.type) {
        case constants.RECEIVED_SLIDER_PHOTOS:
            return [...state, ...action.photos];
        default: 
        console.log('default state', state);
        return [...state];
    }
}
function footer(state: FooterState, action: FooterActions): FooterState {
    switch (action.type) {
        case constants.RECEIVED_FOOTER_SITEMAP:


            return {sitemap: action.sitemap };
        default: 
        return {...state};
    }
 }

function layout(state: LayoutState = {introClosed: false}, action: LayoutActions): LayoutState {
    if (action.type === CLOSE_INTRO_MESSAGE) {
        return {... state, introClosed: true};
    }
    return state;
}

export const rootReducer = combineReducers<StoreState>({sliderPhotos, footer, layout});