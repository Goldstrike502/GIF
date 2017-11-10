import { VillaContentModel } from '../../Types/ContentTypes';
import { Photo } from '../../Types';
import { VillaContentTabs } from './VillaContentTabs';
import { EntryCollection } from 'contentful';
import * as React from 'react';
import { ContentfulClient, VILLAS_CONTENT_TYPE_ID } from '../../Contentful';
import './Villa.css';
import { match } from 'react-router';
import ImageGallery from 'react-image-gallery';
import * as ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
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
                this.selectVillaStateForParam(this.props.match.params.villa, villas);
                return villas;
            });
        }
        selectVillaStateForParam(slug: string, villas: VillaContentModel[]) {
            const selectedVilla: VillaContentModel
                 = villas .find((v: VillaContentModel) => v.slug === slug) || this.state.villas[0];
                 
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
                    this.renderVillaContent(this.state.selectedVilla) 
                    : '')}
            </section>
        );
    }

    private renderVillaContent(state: VillaContentModel): React.ReactNode {
        return (
            <section className="villa-content">
                <VillaContentTabs content={state} />
                <aside className="right-content">
                    <h2>Algemene informatie</h2>
                    <ReactMarkdown source={state.infoRechts} />
                    <hr />
                    <h2>Hoe kunnen wij u helpen?</h2>
                    <p>Vragen over de inrichting, prijzen of is er iets anders niet duidelijk? 
                        Neem gerust contact op, we staan klaar om u te helpen.</p>
                    <Link to={`/vakantie-villa/${state.slug}`} className="button yellow">Contact informatie</Link>
                </aside>
            </section>);
    }
}
function transFormContenfulToPlainModel() {
    return (entries: EntryCollection<any>) => entries.items.map(entry => {
        return {
            ...entry.fields
        };
    });
}
