import { Action, Store } from 'redux';
import { ThunkAction } from 'redux-thunk';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState, // RootState of application, not typed yet
unknown,
Action<string>
>;

declare module 'react-redux' {
  export interface DefaultRootState extends RootState {}
}

declare const store: Store<RootState>;
export default store;
