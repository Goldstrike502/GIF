import * as React from 'react';

interface MarkerProps {
    lat: number;
    lng: number;
    text: string;
    icon?: string;
}

export const Marker: React.StatelessComponent<MarkerProps> = (props) => {
    return (
    <div style={{height: 48, width: 48, top: -24, left: -24, position: 'relative', color: 'white'}}>
        {props.icon ? <img src={props.icon} style={{width: '100%', maxWidth: '100%'}} /> : undefined}
    </div>);
};  