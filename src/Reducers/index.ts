import { PhotoSliderActions, FooterActions } from '../Actions/index';
import { StoreState } from '../Types/index';
import { combineReducers } from 'redux';
import * as constants from '../Constants';

function sliderPhotos(state: StoreState, action: PhotoSliderActions): StoreState {
    switch (action.type) {
        case constants.RECEIVED_SLIDER_PHOTOS:
            return {
                ... state,
                sliderPhotos: [...action.photos]
            };
        default: 
        console.log('action: ', action);
        return {... state};
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
export const RootReducer = combineReducers<StoreState>({sliderPhotos, footer});