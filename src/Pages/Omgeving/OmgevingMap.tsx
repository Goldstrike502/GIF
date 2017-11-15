import * as React from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';

interface DispatchProps {
  onCenterChange?: () => void;
  onZoomChange?: () => void;
}
interface Props {
  center: Coords;
  zoom: number;
}

interface State {

}
export class OmgevingsMap extends React.Component<Props & DispatchProps, State> {
  render() {
    return (
      <div style={{height: '500px', width: '100%'}}>

        <GoogleMapReact 
            defaultCenter={this.props.center} 
            defaultZoom={this.props.zoom} 
            bootstrapURLKeys={{
              key: 'AIzaSyDKjr-WlAVMA62VqnMDI-1jlQ-niCUOWhk',
              language: 'en',
          }}
        />
      </div>
        ); 
  }
}