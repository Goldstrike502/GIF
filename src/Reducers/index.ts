import { ChateauPost, VillaContentModel, MapMarker } from '../Types/ContentTypes';
import {
    CHATEAU_CONTENT_TYPE_ID,
    convertContentfulEntryToPhoto,
    MAP_MARKER_CONTENT_TYPE_ID,
    SLIDER_PHOTO_CONTENT_TYPE_ID,
    VILLAS_CONTENT_TYPE_ID,
} from '../Contentful';
import { LayoutActions, ReceivedWebsiteEntries, SetVacation } from '../Actions';
import { LayoutState, OmgevingState, VacationModel } from '../Types';
import { initialPhotoSliderState } from '../photoslider/Photoslider';
import { PhotoSliderActions } from '../Actions/index';
import { Photo, StoreState } from '../Types/index';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as constants from '../Constants';
import * as moment from 'moment';
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
function vacation(state: VacationModel = {from: moment(), to: moment(), prices: []},
                  action: SetVacation): VacationModel {
    switch (action.type) {
        case constants.SELECTED_VACATION:
        return {
            from: action.from,
            to: action.to,
            villa: action.villa,
            prices: action.prices
        };
        default: 
        return state;
    }
}

function omgeving(state: OmgevingState = {markers: []}, action: ReceivedWebsiteEntries): OmgevingState {
    switch (action.type) {
        case constants.RECEIVED_WEBSITE_ENTRIES:
        return ({
            markers: action.entries.items
                            .filter(entry => entry.sys.contentType.sys.id === MAP_MARKER_CONTENT_TYPE_ID)
                            .map((entry) => {
                                return {... entry.fields} as MapMarker;
                            })
        });
        default: 
        return state;

    }
}

export const rootReducer = combineReducers<StoreState>(
    {
        sliderPhotos,
        villas,
        layout,
        chateauPosts,
        vacation,
        router: routerReducer,
        omgeving
    }
);