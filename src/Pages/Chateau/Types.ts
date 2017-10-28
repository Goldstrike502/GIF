import { Entry } from 'contentful';
import { ContentfulPhoto } from '../../Contentful';
export interface ChateauPost {
    title: string;
    description: string;
    content: string;
    cover: Entry<ContentfulPhoto>;
    slug: string;
}