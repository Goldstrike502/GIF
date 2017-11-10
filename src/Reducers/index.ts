import { ChateauPost, VillaContentModel } from '../Types/ContentTypes';
import {
    CHATEAU_CONTENT_TYPE_ID,
    convertContentfulEntryToPhoto,
    SLIDER_PHOTO_CONTENT_TYPE_ID,
    VILLAS_CONTENT_TYPE_ID,
} from '../Contentful';
import { LayoutActions, ReceivedWebsiteEntries } from '../Actions';
import { LayoutState } from '../Types';
import { initialPhotoSliderState } from '../photoslider/Photoslider';
import { PhotoSliderActions } from '../Actions/index';
import { Photo, StoreState } from '../Types/index';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as constants from '../Constants';
import { CLOSE_INTRO_MESSAGE } from '../Constants';

function sliderPhotos(state: Photo[] = initialPhotoSliderState, action: PhotoSliderActions): Photo[] {
    switch (action.type) {
        case constants.RECEIVED_WEBSITE_ENTRIES:
            return action.entries.items
                .filter(entry => entry.sys.contentType.sys.id === SLIDER_PHOTO_CONTENT_TYPE_ID)
                .map(convertContentfulEntryToPhoto);
        default:
            return [...state];
    }
}

function layout(state: LayoutState = { introClosed: false }, action: LayoutActions): LayoutState {
    if (action.type === CLOSE_INTRO_MESSAGE) {
        return { ...state, introClosed: true };
    }
    return state;
}

function chateauPosts(state: ChateauPost[] = [], action: ReceivedWebsiteEntries): ChateauPost[] {
    switch (action.type) {
        case constants.RECEIVED_WEBSITE_ENTRIES:
            return action.entries.items
                .filter(entry => entry.sys.contentType.sys.id === CHATEAU_CONTENT_TYPE_ID)
                .map((entry) => {
                    return { ...entry.fields } as ChateauPost;
                });
        default:
            return state;
    }
}

function villas(state: VillaContentModel[] = [], action: ReceivedWebsiteEntries): VillaContentModel[] {
    switch (action.type) {
        case constants.RECEIVED_WEBSITE_ENTRIES:
            return action.entries.items
                .filter(entry => entry.sys.contentType.sys.id === VILLAS_CONTENT_TYPE_ID)
                .map((entry) => {
                    return { ...entry.fields } as VillaContentModel;
                });
        default:
            return state;
    }
}

export const rootReducer = combineReducers<StoreState>(
    {
        sliderPhotos,
        layout,
        chateauPosts,
        villas,
        router: routerReducer
    }
);