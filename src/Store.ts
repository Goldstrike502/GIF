import { rootEpic } from './Epics/index';
import { initialFooterSitemap } from './Footer/Footer';
import { rootReducer } from './Reducers/index';
import { StoreState } from './Types/index';
import { createStore, applyMiddleware } from 'redux';
import { initialPhotoSliderState } from './photoslider/Photoslider';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

const epicMiddleware = createEpicMiddleware(rootEpic);
export default function configureStore() {
    const store = createStore<StoreState>(
      rootReducer,
      initialStoreState,
      composeWithDevTools(
        applyMiddleware(epicMiddleware),
        // other store enhancers if any
      ),
    );
 
    return store;
  }

const initialStoreState: StoreState = {
        footer: initialFooterSitemap,
        sliderPhotos: [... initialPhotoSliderState],
        layout: {
            introClosed: false
        },
        chateauPosts: [],
        villas: [],
    };