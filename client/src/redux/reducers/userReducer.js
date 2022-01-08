import * as types from '../types/users';

export default function userReduser(state = {}, action) {
  const { payload, type } = action;
  switch (type) {
    case types.AUTH_USER: {
      const newState = { ...state };
      newState.user = payload;
      return newState;
    }

    case types.LOGOUT_USER: {
      return { ...state, user: null };
    }

    default:
      return state;
  }
}
