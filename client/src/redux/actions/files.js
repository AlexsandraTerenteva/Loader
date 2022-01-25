import axios from 'axios';
import * as types from '../types/files';

// ИНИЦИЛИЗАЦИЯ ФАЙЛОВ
export const initFilesStart = () => ({
  type: types.INIT_FILES_START,
});
export const initFileSuccess = (payload) => ({
  type: types.INIT_FILES_SUCCESS,
  payload,
});

export const initFilesError = (payload) => ({
  type: types.INIT_FILES_ERROR,
  payload,
});

export const initFilesThunk = () => (dispatch) => {
  initFilesStart();
  axios.get('/files')
    .then((res) => dispatch(initFileSuccess(res.data)))
    .catch((error) => initFilesError(error));
};

// ДОБАВЛЕНИЕ ФАЙЛА
export const addFilesStart = () => ({
  type: types.ADD_FILE_START,
});

export const addFileSuccess = (payload) => ({
  type: types.ADD_FILE_SUCCESS,
  payload,
});

export const addFileError = (payload) => ({
  type: types.ADD_FILE_ERROR,
  payload,
});

export const addFilesThunk = (img) => async (dispatch) => {
  dispatch(addFilesStart());
  try {
    const data = new FormData();
    data.append('filedata', img);
    const { data: files } = await axios.post('/files/uploads', data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    dispatch(addFileSuccess(files));
  } catch (error) {
    dispatch(addFileError(error));
  }
};
// РЕДАКТИРОВАНИЕ ФАЙЛА

export const editFileStart = () => ({
  type: types.EDIT_FILE_START,
});

export const editFileSuccess = (payload) => ({
  type: types.EDIT_FILE_SUCCESS,
  payload,
});

export const editFileError = (payload) => ({
  type: types.EDIT_FILE_ERROR,
  payload,
});

export const editFileThunk = ({ id, fileName }) => (dispatch) => {
  dispatch(editFileStart());
  axios.patch(`/files/${id}`, { fileName })
    .then((res) => dispatch(editFileSuccess({ fileName: res.data.fileName, id })))
    .catch((error) => dispatch(editFileError(error)));
};

// УДАЛЕНИЕ ФАЙЛА

export const deleteFileStart = () => ({
  type: types.DELETE_FILE_START,
});

export const deleteFileSuccess = (payload) => ({
  type: types.DELETE_FILE_SUCCESS,
  payload,
});

export const deleteFileError = (payload) => ({
  type: types.DELETE_FILE_ERROR,
  payload,
});

export const deleteFileThunk = (id) => (dispatch) => {
  dispatch(deleteFileStart());
  axios.delete(`/files/${id}`)
    .then(() => dispatch(deleteFileSuccess(id)))
    .catch((error) => dispatch(deleteFileError(error)));
};
