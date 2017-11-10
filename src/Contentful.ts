import { Photo } from './Types';
import { ContentfulClientApi, createClient, Entry } from 'contentful';

export const ContentfulClient: ContentfulClientApi = createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: 'bvxa5ye6wamh',
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: 'de0c32c8627c16932dc693b357e4976c29588eeb9d316697b1669b3fa117271b'
});

export const CHATEAU_CONTENT_TYPE_ID = 'chateauPosts';
export const SLIDER_PHOTO_CONTENT_TYPE_ID = 'sliderPhoto';
export const VILLAS_CONTENT_TYPE_ID = 'villas';
export const OMGEVING_CONTENT_TYPE_ID = 'omgeving';

export function convertContentfulEntryToPhoto(entry: Entry<any>): Photo {
    return {
        original: entry.fields.image.fields.file.url,
        thumbnail: entry.fields.image.fields.file.url
    };
}