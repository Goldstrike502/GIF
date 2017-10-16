import * as React from 'react';
import './Photoslider.css';
import ImageGallery from 'react-image-gallery';

import { ImageGalleryProps } from './Types';
interface Props extends ImageGalleryProps {
    focus?: boolean;
}
interface State {
  isFocussed: boolean;
}
export class PhotoSlider extends React.Component<Props, State> {
  state: State = {
    isFocussed: false
  };

  constructor() {
    super();
  }
  render() {
    return (
    <ImageGallery
      autoPlay={this.state.isFocussed}
      showPlayButton={this.state.isFocussed}
      {... this.props}
    />);

  }
}