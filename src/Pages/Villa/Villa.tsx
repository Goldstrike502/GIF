import { Photo, SliderPhotoContentModel } from '../../Types';
import { Entry, EntryCollection } from 'contentful';
import * as React from 'react';
import { ContentfulClient, ContentfulPhoto, VILLAS_CONTENT_TYPE_ID } from '../../Contentful';
import './Villa.css';
import { match } from 'react-router';
import ImageGallery from 'react-image-gallery';

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
    sliderPhotos: Entry<SliderPhotoContentModel>[];
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
    sliderPhotos: Photo[];
}
export class VillaPage extends React.Component<VillaPageProps, VillaPageState> {
    client = ContentfulClient;

    constructor() {
        super();
        this.client.getEntries({ content_type: VILLAS_CONTENT_TYPE_ID})
            .then(transFormContenfulToPlainModel())
        .then(villas => {
            this.setState({ ... this.state, villas });
            return villas;
        })
        .then((villas: VillaContentModel[]) => {
                this.selectVillaStateForParam(this.props.match.params.villa);
                return villas;
            });
        }
        selectVillaStateForParam(slug: string) {
            const selectedVilla: VillaContentModel
                 = this.state.villas.find((v: VillaContentModel) => v.slug === slug) || this.state.villas[0];
            if (selectedVilla !== undefined && 
                    selectedVilla.sliderPhotos !== undefined) {
                const sliderPhotos: Photo[] = selectedVilla.sliderPhotos.map(photo => {
                    return {
                        original: photo.fields.image.fields.file.url,
                        thumbnail: photo.fields.image.fields.file.url
                      };
                    });
                this.setState({ ... this.state, selectedVilla, sliderPhotos });
            } else {
                this.setState({ ... this.state, selectedVilla });
            }
    }

    render() {

        return (
            <section className="container">
                {this.state && this.state.sliderPhotos ? 
                    <ImageGallery 
                        items={this.state.sliderPhotos} 
                        thumbnailPosition="left"
                    /> : ''}
                {(this.state && this.state.selectedVilla ?
                    this.renderVilla(this.state.selectedVilla) : 'Kies villa')}
            </section>
        );
    }
    renderVilla(model: VillaContentModel) {
        return <section className="villa-beschrijving"> {model.description} </section>;
    }

}
function transFormContenfulToPlainModel() {
    return (entries: EntryCollection<any>) => entries.items.map(entry => {
        return {
            ...entry.fields
        };
    });
}
