import * as types from '../types/files';

export default function filesReducer(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case types.ADD_FILE: {
      const newState = [...state];
      newState.files = [...newState.files, payload];
      return [...state, payload];
    }
    case types.INIT_FILES: {
      let newState = [...state];
      newState = [...payload];
      return newState;
    }
    default: {
      return state;
    }
  }
}
