import * as React from 'react';
import './Photoslider.css';
import ImageGallery from 'react-image-gallery';
import ReactTooltip from 'react-tooltip';

import { ImageGalleryProps } from './Types';
interface Props extends ImageGalleryProps {
  closed?: boolean | undefined;
  onClose?: () => void;
}
interface State {
  isClosed: boolean;
}
export class PhotoSlider extends React.Component<Props, State> {
  _imageGallery: any;
  state = { isClosed: false };
constructor() {
  super();
}
componentWillReceiveProps(props: Props) {
  this.setState({isClosed: props.closed || false});
}
render() {
  return (
    <div className={this.state.isClosed ? 'focus' : 'blur'}>
      <ImageGallery
        ref={(i) => this._imageGallery = i}
        autoPlay={this.state.isClosed}
        showPlayButton={this.state.isClosed}
        showFullscreenButton={this.state.isClosed}
        thumbnailPosition="top"
        showThumbnails={this.state.isClosed}
        showNav={this.state.isClosed}
        {... this.props}
      />
      <i 
        className={'material-icons play ' + (this.state.isClosed ? 'hidden' : '')}
        data-tip="BEKIJK FOTO'S"
        onClick={() => this.onClose()} 
      >
        play_circle_outline
      </i>
        <ReactTooltip effect="solid" place="bottom" />
    </div>
    );
  }

  onClose() {
    this._imageGallery.play();
    this.setState({
      ... this.state,
      isClosed: true
    });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
}