/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { CloudUploadOutlined, CloseOutlined } from '@ant-design/icons';
import Modal from 'react-modal';
import TableCell from '../TableCell';

export default function TableRow({ data }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  function openModal(src) {
    console.log({ src });
    setImgSrc(src);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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

  if (data.length === 0) {
    return <h2>Файлов еще нет ..</h2>;
  }
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal()}
        style={customStyles}
      >
        <button type="button" onClick={closeModal} className="btn-close">
          {' '}
          <CloseOutlined />
        </button>
        <div>
          <img src={`${imgSrc}`} alt="foto" className="img-full" />
        </div>
      </Modal>
      {data && data.map((el) => (
        <TableCell el={el} openModal={openModal} />
      ))}
    </>
  );
}
