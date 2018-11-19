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

export interface SelectInitialContactForm {
    type: constants.SELECT_INITIAL_CONTACT_FORM;
    form: 'contact' | 'prijs' | 'belmijterug';
}
export interface SetVacation {
    type: constants.SELECTED_VACATION;
    from: Moment;
    to: Moment;
    villa?: VillaContentModel;
    prices: PriceRange[];
}
export type PhotoSliderActions = ReceivedWebsiteEntries;
export interface ContactSucceeded { 
    type: constants.CONTACT_SUCCEEDED;
}
export function receivedWebsiteEntries(entries: EntryCollection<any>) {
    return {
        type: constants.RECEIVED_WEBSITE_ENTRIES,
        entries,
    };
}

export function setContactSucceeded() {
    return {
        type: constants.CONTACT_SUCCEEDED
    };
}
export type LayoutActions = CloseIntro | SelectInitialContactForm | ContactSucceeded;

export function closeIntro(): CloseIntro {
    return {
        type: constants.CLOSE_INTRO_MESSAGE
    };
}
export function setInitialContactForm(form: 'contact' | 'prijs' | 'belmijterug') {
    return {
        type: constants.SELECT_INITIAL_CONTACT_FORM,
        form,
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

export function sendFormToGoogleSheets(formData: FormData) {
    return {
        type: constants.SEND_FORM_TO_GOOGLE_SHEETS,
        formData
    };
}