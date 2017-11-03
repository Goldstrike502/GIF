import { Photo, StoreState } from '../Types/index';
import * as React from 'react';
import './Photoslider.css';
import ImageGallery from 'react-image-gallery';
import ReactTooltip from 'react-tooltip';

import { ImageGalleryProps } from './../Types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
interface Props extends ImageGalleryProps {
  closed?: boolean | undefined;
  onClose?: () => void;
  items: Photo[];
}
interface State {
  items: Photo[];
  isClosed: boolean;
}

export const initialPhotoSliderState: Photo[] = [{
  // tslint:disable-next-line:max-line-length
  original: `https://images.contentful.com/bvxa5ye6wamh/5Gsh0qeQZGi8MEQksWqKwE/66e78a77e2a27ae4c32b10ccf3dc0329/background.jpg`,
  thumbnail: `https://images.contentful.com/bvxa5ye6wamh/5Gsh0qeQZGi8MEQksWqKwE/66e78a77e2a27ae4c32b10ccf3dc0329/background.jpg`
}];

function mapStateToProps(state: StoreState): Props {
  console.log('map state to props', state.sliderPhotos);
  return {items: state.sliderPhotos}; 
} 

function mapDispatchToProps(dispatch: Dispatch<Props>): Partial<Props> {
  return { };
}

class PhotoSliderComponent extends React.Component<Props, State> {
  _imageGallery: any;
  state = { isClosed: false , items: []};
  constructor() {
    super();

  }

  render() {
    console.log('render', this.props);
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
          items={this.state.items}
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
export const BackgroundPhotoSlider = connect(mapStateToProps, mapDispatchToProps)(PhotoSliderComponent);
export const PhotoSlider = connect<Props, Partial<Props>>
                                  (mapStateToProps, mapDispatchToProps)
                                      ((props: Props) => <ImageGallery {... props} />);