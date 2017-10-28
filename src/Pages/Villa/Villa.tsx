
import * as React from 'react';
import { ContentfulPhoto } from '../../Contentful';
import './Villa.css';

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