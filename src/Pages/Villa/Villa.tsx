import { VILLAS_ROUTE_URL } from '../../Routes';
// import { FeatureIcons } from './FeatureIcons';
import { setVacation, setInitialContactForm } from '../../Actions';
import { Dispatch } from 'redux';
import { getCurrentRoute, getCurrentVillaForRoute, selectFirstVillaModel } from '../../Selectors';
import { PriceRange, VillaContentModel } from '../../Types/ContentTypes';
import { Photo, StoreState, VacationModel } from '../../Types';
import { VillaContentTabs } from './VillaContentTabs';
import * as React from 'react';
import { ContentfulClient, convertContentfulEntryToPhoto, SLIDER_PHOTO_CONTENT_TYPE_ID } from '../../Contentful';
import './Villa.css';
import ImageGallery from 'react-image-gallery';
import * as ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PriceCalendar } from './PriceCalendar';
import * as moment from 'moment';
import { ScrollToTopOnMount } from '../../ScrollToTopOnMount';
import { initialize } from 'redux-form';

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
interface VillaPageProps {
    selectedVilla?: VillaContentModel;
    villas: VillaContentModel[];
    sliderPhotos: Photo[];
    vacation: VacationModel;
    onVacationSelect: (from: moment.Moment, to: moment.Moment, model: VillaContentModel, prices: PriceRange[]) => any;
}
interface VillaPageState {
}

function mapStateToProps(state: StoreState): VillaPageProps {
    const selectedVilla = getCurrentVillaForRoute(state, getCurrentRoute(state)) || selectFirstVillaModel(state);
    // tslint:disable-next-line:no-console
    console.log('villa state', selectedVilla);
    return {
        sliderPhotos: selectedVilla ? selectedVilla.sliderPhotos
            .filter(photo => photo.sys.contentType
                && photo.sys.contentType.sys.id === SLIDER_PHOTO_CONTENT_TYPE_ID)
            .map(convertContentfulEntryToPhoto) : [],
        villas: state.villas,
        selectedVilla,
        vacation: state.vacation,
        onVacationSelect: (a, b, c) => undefined
    };
}
function mapDispatchToProps(dispatch: Dispatch<StoreState>) {
    return {
        onVacationSelect: (from: moment.Moment, to: moment.Moment, model: VillaContentModel, prices: PriceRange[]) => {
            dispatch(setVacation(from, to, model, prices));
            // tslint:disable-next-line:no-console
            console.log('model', model);
            dispatch(initialize('prijs', {vanaf: moment(from), tot: moment(to), villa: model.slug}));
            dispatch(setInitialContactForm('prijs'));
        }
    };

}

export class VillaPageComponent extends React.Component<VillaPageProps, VillaPageState> {
    client = ContentfulClient;
    render() {
        return (
            <div>
                <ScrollToTopOnMount />
                <section className="container">
                    {(this.props.selectedVilla ?
                        this.renderVillaContent(this.props.selectedVilla)
                        : '')}

                </section>
                <section className="prijzen">
                    <h1>Prijzen &amp; beschikbaarheid</h1>
                    {this.props.selectedVilla ? <PriceCalendar
                        selectedVacation={this.props.vacation}
                        onRangeSelect={(from, to, prices) => {
                            // console.log('pricessss', prices);
                            if (this.props.onVacationSelect && this.props.selectedVilla) {
                                this.props.onVacationSelect(from, to, this.props.selectedVilla, prices);
                            }
                        }}
                        prices={this.props.selectedVilla.prijzen.map(entry => entry.fields)}
                        selectedPrices={this.props.vacation.prices}
                    /> : null}
                </section>
            </div>
        );

    }

    private renderVillaContent(content: VillaContentModel): React.ReactNode {
        return (

            <section className="villa-content">
                <div className="left-content">
                {this.props.sliderPhotos ?
                        <ImageGallery
                            items={this.props.sliderPhotos}
                            thumbnailPosition="left"
                        /> : ''}
                    <section className="villa-title">
                        <h1>{content.title}</h1>
                        {this.props.villas
                            .filter(v => v.title !== content.title) // dont show current page link
                            .map(v =>
                                <Link
                                    key={v.slug}
                                    to={VILLAS_ROUTE_URL + '/' + v.slug}
                                >
                                    <h2>{v.title}</h2>
                                </Link>)}
                    </section>
                    <VillaContentTabs content={content} />
                </div>
                <aside className="right-content">
                    <h2>Algemene informatie</h2>
                    <ReactMarkdown source={content.infoRechts} />
                    {/* <FeatureIcons /> */}
                    <hr />
                    <h2>Hoe kunnen wij u helpen?</h2>
                    <p>Vragen over de inrichting, prijzen of is er iets anders niet duidelijk?
                            Neem gerust contact op, we staan klaar om u te helpen.</p>
                    <Link to={`/contact`} className="button yellow">Contact informatie</Link>
                </aside>
            </section>
        );
    }
}
export const VillaPage = connect(mapStateToProps, mapDispatchToProps)(VillaPageComponent);