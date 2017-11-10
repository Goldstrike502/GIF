import { rootEpic } from './Epics/index';
import { initialFooterSitemap } from './Footer/Footer';
import { rootReducer } from './Reducers/index';
import { StoreState } from './Types/index';
import { createStore, applyMiddleware } from 'redux';
import { initialPhotoSliderState } from './photoslider/Photoslider';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';



const epicMiddleware = createEpicMiddleware(rootEpic);

export const history = createHistory();
const router = routerMiddleware(history);

export function configureStore() {
    const store = createStore<StoreState>(
      rootReducer,
      initialStoreState,
      composeWithDevTools(
        applyMiddleware(...[epicMiddleware, router]),
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