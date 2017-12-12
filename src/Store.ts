import { rootEpic } from './Epics/index';
import { rootReducer } from './Reducers/index';
import { StoreState } from './Types/index';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import scrollRestorationMiddleware from 'redux-router-scroll-restoration';

const epicMiddleware = createEpicMiddleware(rootEpic);

export const history = createHistory();
const router = routerMiddleware(history);

export function configureStore() {
    const store = createStore<StoreState>(
      rootReducer,
      composeWithDevTools(
        applyMiddleware(...[epicMiddleware, router, scrollRestorationMiddleware]),
        // other store enhancers if any
      ),
    );
 
    return store;
  }

// const initialStoreState: StoreState = {
//         sliderPhotos: [... initialPhotoSliderState],
//         layout: {
//             introClosed: false
//         },
//         chateauPosts: [],
//         villas: [],
//         router: {location: null},
//         vacation: {from: moment(), to: moment(), villa: undefined}
//     };