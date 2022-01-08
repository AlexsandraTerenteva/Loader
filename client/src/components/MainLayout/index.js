import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloudUploadOutlined, CloseOutlined } from '@ant-design/icons';
import './MainTable.css';
import axios from 'axios';
import Modal from 'react-modal';
import TableRow from './TableRow';

import FormAddFile from '../Form/FormAddFile';
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
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const { files } = useSelector((state) => state);
  const dispatch = useDispatch();

  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    axios.get('/feed')
      .then((res) => dispatch(actions.initFiles(res.data)))
      .catch((error) => console.log(error));
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
        onAfterOpen={() => afterOpenModal()}
        onRequestClose={() => closeModal()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button type="button" onClick={closeModal} className="btn-close">
          {' '}
          <CloseOutlined />
        </button>
        <FormAddFile onRequestClose={() => closeModal()} />
      </Modal>
      <table className="main-table">
        <tr>
          <th>Превью</th>
          <th>Название файла</th>
          <th>Размер</th>
          <th>Действия</th>
        </tr>
        {files && <TableRow data={files} /> }
      </table>
    </>
  );
}
