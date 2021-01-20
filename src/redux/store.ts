import { createStore, applyMiddleware, compose } from 'redux';
// eslint-disable-next-line import/no-unresolved
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';
import createTaskObserverMiddleware from './middlewares/TaskObserver.middleware';

const composeEnhancers = typeof window === 'object'
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    reduxThunk,
    createTaskObserverMiddleware(),
  ),
);

export default createStore(
  rootReducer,
  enhancer,
);
