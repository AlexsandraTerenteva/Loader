/* eslint-disable no-sequences */
import * as types from '../types/files';

export default function filesReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.INIT_FILES_START,
    types.DELETE_FILE_START,
    types.ADD_FILE_START,
    types.EDIT_FILE_START: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = true;
      newState.error = null;
      return newState;
    }
    case types.INIT_FILES_ERROR,
    types.DELETE_FILE_ERROR,
    types.ADD_FILE_ERROR,
    types.INIT_FILES_ERROR: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = payload;
      return newState;
    }
    case types.INIT_FILES_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = payload;
      return newState;
    }
    case types.ADD_FILE_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = [...newState.data, payload];
      return newState;
    }
    case types.DELETE_FILE_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = newState.data.filter((item) => item.id !== Number(payload));
      return newState;
    }

    case types.EDIT_FILE_SUCCESS: {
      const newState = JSON.parse(JSON.stringify(state));
      newState.loading = false;
      newState.error = null;
      newState.data = newState.data.map((item) => {
        if (item.id === Number(payload.id)) {
          return {
            ...item, title: payload.fileName,
          };
        }
        return item;
      });
      return newState;
    }
    default: {
      return state;
    }
  }
}
