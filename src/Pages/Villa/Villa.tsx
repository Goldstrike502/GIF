import {  setVacation } from '../../Actions';
import { Dispatch } from 'redux';
import { getCurrentRoute, getCurrentVillaForRoute } from '../../Selectors';
import { VillaContentModel } from '../../Types/ContentTypes';
import { Photo, StoreState, VacationModel } from '../../Types';
import { VillaContentTabs } from './VillaContentTabs';
import * as React from 'react';
import { ContentfulClient, convertContentfulEntryToPhoto } from '../../Contentful';
import './Villa.css';
import ImageGallery from 'react-image-gallery';
import * as ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PriceCalendar } from './PriceCalendar';
import { Moment } from 'moment';

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
    selectedVilla?: VillaContentModel;
    villas: VillaContentModel[];
    sliderPhotos: Photo[];
    vacation: VacationModel;
    onVacationSelect: (from: Moment, to: Moment, model?: VillaContentModel) => any;
}
interface VillaPageState {
}

function mapStateToProps(state: StoreState): VillaPageProps {
    const selectedVilla = getCurrentVillaForRoute(state, getCurrentRoute(state));
    return {
        sliderPhotos: selectedVilla ? selectedVilla.sliderPhotos.map(convertContentfulEntryToPhoto) : [],
        villas: state.villas,
        selectedVilla,
        vacation: state.vacation,
        onVacationSelect: (a, b, c) => undefined 
    };
}
function mapDispatchToProps(dispatch: Dispatch<StoreState>) {
    return {
        onVacationSelect: (from: Moment, to: Moment, model: VillaContentModel) => 
        dispatch(setVacation(from, to, model))        
     };

}

export class VillaPageComponent extends React.Component<VillaPageProps, VillaPageState> {
    client = ContentfulClient;

    constructor() {
        super();
    }

    render() {
   
        return (
                <div>
                    <section className="container">
                        {this.props.sliderPhotos ? 
                            <ImageGallery 
                                items={this.props.sliderPhotos} 
                                thumbnailPosition="left"
                            /> : ''}
                        {(this.props.selectedVilla ?
                            this.renderVillaContent(this.props.selectedVilla) 
                            : '')}
                            
                    </section>
                    <section className="prijzen">
                        <h1>Prijzen & beschikbaarheid</h1>
                        {this.props.selectedVilla ? <PriceCalendar 
                            selectedRange={[this.props.vacation.from, this.props.vacation.to]}
                            onRangeSelect={(from, to) =>
                                     this.props.onVacationSelect(from, to, this.props.selectedVilla)}
                            prices={this.props.selectedVilla.prijzen.map(entry => entry.fields)}
                        /> : null}
                    </section>
                </div>
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
export const VillaPage = connect(mapStateToProps, mapDispatchToProps)(VillaPageComponent);