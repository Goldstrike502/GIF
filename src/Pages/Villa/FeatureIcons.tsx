import { getCurrentRoute, getCurrentVillaForRoute } from '../../Selectors';
import * as React from 'react';
import { FeatureIcon } from '../../Types/ContentTypes';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { StoreState } from '../../Types/index';

interface Props {
    icons: FeatureIcon[];
}
export const FeatureIconsComponent: React.StatelessComponent<Props> = props => {
    return (
        <div>
            {props.icons.map(icon => <span key={icon.title} className="feature-icon"><i 
                className="material-icons" 
                data-tip={icon.title}
            >{icon.icon}
            </i><ReactTooltip effect="solid" place="bottom" />
            </span>)}
        </div>
    );
};
function mapStateToProps(state: StoreState): Props {
    const selectedVilla = getCurrentVillaForRoute(state, getCurrentRoute(state));
    return {
        icons: selectedVilla ? selectedVilla.faciteitenIconen.map(_ => _.fields) : []
    };
}
export const FeatureIcons = connect(mapStateToProps)(FeatureIconsComponent);