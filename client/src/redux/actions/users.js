import * as types from '../types/users';

export const authUser = (payload) => ({
  type: types.AUTH_USER,
  payload,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});
