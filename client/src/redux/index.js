import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';

const initialState = {
  user: {},
  files: [],
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware()));

export default store;
