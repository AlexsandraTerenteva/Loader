import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const initialState = {
  user: {
    loading: false,
    error: null,
    data: null,
  },
  files: {
    loading: false,
    error: null,
    data: [],
  },
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
