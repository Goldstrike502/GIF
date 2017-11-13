import { ContentModelTypes, PriceRange, VillaContentModel } from '../Types/ContentTypes';
import { EntryCollection } from 'contentful';
import * as constants from '../Constants';
import { Moment } from 'moment';

export interface GetWebsiteContent {
    type: constants.GET_WEBSITE_CONTENT;
}

export interface ReceivedWebsiteEntries {
    type: constants.RECEIVED_WEBSITE_ENTRIES;
    entries: EntryCollection<ContentModelTypes>;
}

export interface CloseIntro {
    type: constants.CLOSE_INTRO_MESSAGE;
}

export interface SetVacation {
    type: constants.SELECTED_VACATION;
    from: Moment;
    to: Moment;
    villa?: VillaContentModel;
    prices: PriceRange[];
}
export type PhotoSliderActions = ReceivedWebsiteEntries;

export function receivedWebsiteEntries(entries: EntryCollection<any>) {
    console.log('received website entries', entries);
    return {
        type: constants.RECEIVED_WEBSITE_ENTRIES,
        entries,
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
export function setVacation(from: Moment, to: Moment, villa: VillaContentModel | undefined = undefined,
                            prices: PriceRange[]): SetVacation {
    return {
        type: constants.SELECTED_VACATION,
        from,
        to,
        villa,
        prices
    };
}