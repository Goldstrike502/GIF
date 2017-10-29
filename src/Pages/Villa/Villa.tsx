import { EntryCollection } from 'contentful';
import * as React from 'react';
import {
    ContentfulClient,
    ContentfulPhoto,
    VILLAS_CONTENT_TYPE_ID
} from '../../Contentful';
import './Villa.css';
import { match } from 'react-router';
// import ImageGallery from 'react-image-gallery';

interface Props {
    children?: JSX.Element | string;
}
interface State {
    selectedVilla: React.StatelessComponent<{ faciliteiten: string }>;
}
export class VillaCompactView extends React.Component<Props, State> {
    render() {
        return (
            <div className="villa-compact-view">{this.props.children}</div>
        );
    }
}
export interface VillaContentModel {
    id: string;
    title: string;
    faciliteiten: string;
    description: string;
    plattegrond: ContentfulPhoto;
    infoRechts: string;
    prijsVanaf: string;
    slug: string;
}
export interface VillaFaciliteiten extends Partial<VillaContentModel> {
    id: string;
    title: string;
    faciliteiten: string;
    prijsVanaf: string;
    slug: string;
}
export const villa: React.StatelessComponent<{ faciliteiten: string }> = props => {
    return (<div>{props.faciliteiten}</div>);
};
interface VillaPageProps {
    match: match<{ villa: string }>;
}
interface VillaPageState {
    selectedVilla?: VillaContentModel;
    villas: VillaContentModel[];
}
export class VillaPage extends React.Component<VillaPageProps, VillaPageState> {
    client = ContentfulClient;

    constructor() {
        super();
        this.client.getEntries({ content_type: VILLAS_CONTENT_TYPE_ID})
            .then(newFunction())
            .then(villas => {
                console.log('dataaaaaa', villas);
                this.setState({ ... this.state, villas });
                this.selectVillaForParam(this.props.match.params.villa);
            });
    }
    selectVillaForParam(slug: string) {
        const selectedVilla = this.state.villas.find(v => v.slug === slug);
        this.setState({ ... this.state, selectedVilla });
    }

    render() {
        return (
            <section className="container">
                {/* <ImageGallery items= /> */}
                {(this.state && this.state.selectedVilla ?
                    this.renderVilla(this.state.selectedVilla) : 'Kies villa')}
            </section>
        );
    }
    renderVilla(model: VillaContentModel) {
        if (model) {

            return (
                <section className="villa-beschrijving"> {model.description} </section>
            );
        } else {
            return false;
        }
    }

}
function newFunction() {
    return (entries: EntryCollection<VillaContentModel>) => entries.items.map(entry => {
        return {
            ...entry.fields
        };
    });
}
