import { EntryCollection } from 'contentful';

import * as React from 'react';
import { ContentfulClient, ContentfulPhoto, VILLAS_CONTENT_TYPE_ID } from '../../Contentful';
import './Villa.css';
import { match } from 'react-router';

interface Props {
    children?: JSX.Element | string;
}
interface State {
    selectedVilla: React.StatelessComponent<{faciliteiten: string}>;
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
}
export const villa: React.StatelessComponent<{faciliteiten: string}> = props => {
    return (<div>{props.faciliteiten}</div>);
};
interface VillaPageProps {
    match: match<{villa: string}>;
}
interface VillaPageState {
    selectedVilla?: VillaContentModel;
    villas: VillaContentModel[];
}
export class VillaPage extends React.Component<VillaPageProps, VillaPageState> {
    client = ContentfulClient;
    constructor() {
        super();
        this.client.getEntries({content_type: VILLAS_CONTENT_TYPE_ID})
            .then((entries: EntryCollection<VillaContentModel>) => 
                entries.items.map(entry => {
                    return {
                        ... entry.fields
                    };
            })).then(villas => {
                console.log('villas', villas);
                this.setState({... this.state, villas});
            });
    }

    render() {
        return (
            <section className="container">
                a
            </section>
        );
    }

}