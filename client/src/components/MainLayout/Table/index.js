/* eslint-disable react/jsx-no-bind */
import {
  useState, useEffect, useCallback, memo,
} from 'react';
import { useSelector } from 'react-redux';
import MainModal from '../../Modal';
import TableRow from '../TableRow';

function Table() {
  const { data } = useSelector((state) => state.files);
  const [files, setFiles] = useState(data);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  const openModal = useCallback((src) => {
    setImgSrc(src);
    setIsOpen(true);
  }, [setIsOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setFiles(data);
  }, [data]);

  console.log('table');
  return (
    <>
      <table className="main-table">
        <thead>
          <tr>
            <th>Превью</th>
            <th>Название файла</th>
            <th>Размер</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan="2">Общий размер файлов:</td>
            <td>1168,80</td>
          </tr>
        </tfoot>
        <tbody>
          {files ? files.map((el) => (
            <TableRow key={el.id} el={el} openModal={openModal} />
          ))
            : <tr><th>Файлов нет ...</th></tr>}
        </tbody>
      </table>
      <MainModal
        modalIsOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div>
          <img src={`${imgSrc}`} alt="foto" className="img-full" />
        </div>
      </MainModal>
    </>
  );
}

export default Table;
