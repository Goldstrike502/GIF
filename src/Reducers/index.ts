import { initialPhotoSliderState } from '../photoslider/Photoslider';
import { PhotoSliderActions, FooterActions } from '../Actions/index';
import { Photo, StoreState } from '../Types/index';
import { combineReducers } from 'redux';
import * as constants from '../Constants';

function sliderPhotos(state: Photo[] = initialPhotoSliderState, action: PhotoSliderActions): Photo[] {
    switch (action.type) {
        case constants.RECEIVED_SLIDER_PHOTOS:
            return [...action.photos];
        default: 
        console.log('default state', state);
        return [...state];
    }
}
function footer(state: StoreState, action: FooterActions): StoreState {
    switch (action.type) {
        case constants.RECEIVED_FOOTER_SITEMAP_ITEMS:
            const footerState = {... state.footer};
            footerState.items.push(action.branch);
            return {... state, footer: footerState};
        default: 
        return {...state};
    }
 }
  
export const rootReducer = combineReducers<StoreState>({sliderPhotos, footer});