import { combineReducers } from 'redux';
import userReducers from './userReducer';
import filesReducer from './filesReducer';

const reducersSpec = {
  user: userReducers,
  files: filesReducer,
};

const rootReducer = combineReducers(reducersSpec);

export default rootReducer;
