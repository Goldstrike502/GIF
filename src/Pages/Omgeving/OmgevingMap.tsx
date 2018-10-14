import { MapMarker } from '../../Types/ContentTypes';
import { googleMapsKey } from '../../Constants/api';
import * as React from 'react';
import GoogleMapsReact, { Coords } from 'google-map-react';
import { Marker } from './Marker';

interface DispatchProps {
  onCenterChange?: () => void;
  onZoomChange?: () => void;
}
interface Props {
  center: Coords;
  zoom: number;
  markers: MapMarker[];
}

interface State {

}
export class OmgevingsMap extends React.Component<Props & DispatchProps, State> {
  render() {
    // console.log('markers', this.props.markers);
    return (
      <div style={{ height: '500px', width: '100%' }}>

        <GoogleMapsReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          bootstrapURLKeys={googleMapsKey}
        >
            {this.props.markers.map((marker, i) => <Marker
              key={i}
              lat={marker.locatie.lat}
              lng={marker.locatie.lon}
              text={marker.title}
              icon={marker.markerIcon.fields.file.url}
            />
            )}
        </GoogleMapsReact>
      </div>
    );
  }
}