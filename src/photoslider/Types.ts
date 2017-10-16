
type positionTypes = 'top' | 'right' | 'bottom' | 'left';
export interface Photo {
  original?: string;
  thumbnail?: string;
  originalClass?: string;
  thumbnailClass?: string;
  originalAlt?: string;
  thumbnailAlt?: string;
  originalTitle?: string;
  thumbnailTitle?: string;
  thumbnailLabel?: string;
  description?: string;
  srcSet?: string;
  sizes?: string;
}
export interface ImageGalleryProps {
  items?: Photo[];
  infinite?: boolean;
  lazyLoad?: boolean;
  showNav?: boolean;
  showThumbnails?: boolean;
  thumbnailPosition?: positionTypes;
  showFullscreenButton?: boolean;
  useBrowserFullscreen?: boolean;
  showPlayButton?: boolean;
  showBullets?: boolean;
  showIndex?: boolean;
  autoPlay?: boolean;
  disableThumbnailScroll?: boolean;
  slideOnThumbnailHover?: boolean;
  disableArrowKeys?: boolean;
  disableSwipe?: boolean;
  defaultImage?: boolean;
  indexSeparator?: string;
  slideDuration?: number;
  swipingTransitionDuration?: number;
  slideInterval?: number;
  swipeThreshold?: number;
  startIndex?: number;
  onImageError?: () => void;
  onThumbnailClick?: () => void;
  onImageLoad?: () => void;
  onSlide?: () => void;
  onScreenChange?: () => void;
  onPause?: () => void;
  onPlay?: () => void;
  onClick?: () => void;
  onTouchMove?: () => void;
  onTouchEnd?: () => void;
  onTouchStart?: () => void;
  renderCustomControls?: () => void;
}