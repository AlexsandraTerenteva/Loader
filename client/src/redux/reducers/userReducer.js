/* eslint-disable no-sequences */
import * as types from '../types/users';

export default function userReduser(state = {}, action) {
  const { payload, type } = action;
  switch (type) {
    case types.AUTH_USER_CHECK_START,
    types.AUTH_USER_START,
    types.LOGOUT_USER_START,
    types.REGISTER_USER_START: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = true;
      newState.error = null;
      return newState;
    }
    case types.AUTH_USER_CHECK_ERROR,
    types.AUTH_USER_ERROR,
    types.LOGOUT_USER_ERROR,
    types.REGISTER_USER_ERROR: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = payload;
      return newState;
    }
    case types.AUTH_USER_CHECK_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = { ...newState.data, ...payload };
      return newState;
    }
    case types.AUTH_USER_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = payload;
      return newState;
    }

    case types.LOGOUT_USER_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = null;
      return newState;
    }
    case types.REGISTER_USER_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = payload;
      return newState;
    }

    default:
      return state;
  }
}
