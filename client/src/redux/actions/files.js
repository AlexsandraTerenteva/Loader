import * as types from '../types/files';

export const initFiles = (payload) => ({
  type: types.INIT_FILES,
  payload,
});

export const addFile = (payload) => ({
  type: types.ADD_FILE,
  payload,
});
