import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-unresolved
import rootReducer from './rootReducer';
import reduxThunk from 'redux-thunk';

export default createStore(rootReducer, applyMiddleware(reduxThunk));
