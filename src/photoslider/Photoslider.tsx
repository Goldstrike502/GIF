import * as React from 'react';
import './Photoslider.css';
import ImageGallery from 'react-image-gallery';

import { ImageGalleryProps } from './Types';
interface Props extends ImageGalleryProps {
  focus?: boolean | undefined;
}
interface State {
  isFocussed: boolean;
}
export class PhotoSlider extends React.Component<Props, State> {
state = { isFocussed: false };
constructor() {
  super();
}
componentWillReceiveProps(props: Props) {
  this.setState({isFocussed: props.focus || false});
}
render() {
  return (
    <div
      className={this.state.isFocussed ? 'focus' : 'blur'}
    >
      <ImageGallery
        autoPlay={this.state.isFocussed}
        showPlayButton={this.state.isFocussed}
        showFullscreenButton={this.state.isFocussed}
        showNav={this.state.isFocussed}
        {... this.props}
      />
    </div>
    );

}
}