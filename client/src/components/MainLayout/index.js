import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CloudUploadOutlined, CloseOutlined } from '@ant-design/icons';
import './MainLayout.css';
import Modal from 'react-modal';
import { Outlet } from 'react-router';
import FormAddFile from '../Form/FormAddFile';
import Table from './Table';
import * as actions from '../../redux/actions/files';

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function MainLayout() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal()}
        style={customStyles}
      >
        <button type="button" onClick={closeModal} className="btn-close">
          {' '}
          <CloseOutlined />
        </button>
        <FormAddFile onRequestClose={() => closeModal()} />
      </Modal>
      <Table />
    </>
  );
}
