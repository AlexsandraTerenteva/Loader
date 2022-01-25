import axios from 'axios';
import * as types from '../types/users';

// АВТОРИЗАЦИЯ
export const authUserStart = () => ({
  type: types.AUTH_USER_START,
});

export const authUserSuccess = (payload) => ({
  type: types.AUTH_USER_SUCCESS,
  payload,
});

export const authUserError = (payload) => ({
  type: types.AUTH_USER_ERROR,
  payload,
});

export const authUserThunk = (user) => (dispatch) => {
  dispatch(authUserStart());
  axios.post('/api/auth/login', user)
    .then((res) => dispatch(authUserSuccess(res.data)))
    .catch((error) => dispatch(authUserError(error)));
};

// РЕГИСТРАЦИЯ
export const registerUserStart = () => ({
  type: types.REGISTER_USER_START,
});

export const registerUserSuccess = (payload) => ({
  type: types.REGISTER_USER_SUCCESS,
  payload,
});

export const registerUserError = (payload) => ({
  type: types.REGISTER_USER_ERROR,
  payload,
});

export const registerUserThunk = ({ user }) => (dispatch) => {
  dispatch(registerUserStart());
  axios.post('api/auth/register', user, { withCredentials: true })
    .then((res) => {
      dispatch(registerUserSuccess(res.data));
    })
    .catch((error) => dispatch(registerUserError(error)));
};

// ПРОВЕРКА АВТОРИЗАЦИИ
export const authUserCheckStart = () => ({
  type: types.AUTH_USER_CHECK_START,
});

export const authUserCheckSuccess = (payload) => ({
  type: types.AUTH_USER_CHECK_SUCCESS,
  payload,
});

export const authUserCheckError = (payload) => ({
  type: types.AUTH_USER_CHECK_ERROR,
  payload,
});

export const authUserCheckThunk = () => (dispatch) => {
  dispatch(authUserCheckStart());
  axios
    .get('/api/auth')
    .then((res) => dispatch(authUserCheckSuccess(res.data)))
    .catch((err) => dispatch(authUserCheckError(err)));
};

// ВЫХОД
export const logoutUserStart = () => ({
  type: types.LOGOUT_USER_START,
});

export const logoutUserError = (payload) => ({
  type: types.LOGOUT_USER_ERROR,
  payload,
});
export const logoutUserSuccess = () => ({
  type: types.LOGOUT_USER_SUCCESS,
});

export const logoutUserThunk = () => (dispatch) => {
  dispatch(logoutUserStart());
  axios
    .get('/api/auth/logout')
    .then(() => {
      dispatch(logoutUserSuccess());
    })
    .catch((err) => dispatch(logoutUserError(err)));
};
