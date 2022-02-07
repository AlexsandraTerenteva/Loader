/* eslint-disable react/jsx-no-bind */
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { CloudUploadOutlined } from '@ant-design/icons';
import './MainLayout.css';
import MainModal from '../Modal';
import FormAddFile from '../Form/FormAddFile';
import Table from './Table';
import * as actions from '../../redux/actions/files';

export default function MainLayout() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(actions.initFilesThunk());
  }, [dispatch]);

  return (
    <>
      <button onClick={openModal} type="button" className="btn-add-file">
        Загрузить файл
        {' '}
        <CloudUploadOutlined />
      </button>
      <MainModal
        modalIsOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <FormAddFile onRequestClose={closeModal} />
      </MainModal>
      <Table />
    </>
  );
}
