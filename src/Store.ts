import { initialFooterSitemap } from './Footer/Footer';
import { RootReducer } from './Reducers/index';
import { StoreState } from './Types/index';
import { createStore } from 'redux';
import { initialPhotoSliderState } from './photoslider/Photoslider';

export const store = createStore<StoreState>(RootReducer, {
    footer: initialFooterSitemap,
    chateauPosts: [],
    VillaFaciliteiten: [],
    villas: [],
    sliderPhotos: initialPhotoSliderState
});