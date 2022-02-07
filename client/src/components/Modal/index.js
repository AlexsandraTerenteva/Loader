/* eslint-disable no-undef */
import Modal from 'react-modal';
import { CloseOutlined } from '@ant-design/icons';

export default function MainModal({ modalIsOpen, onRequestClose, children }) {
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

  Modal.setAppElement('#root');

  return (

    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <button type="button" onClick={onRequestClose} className="btn-close">
        {' '}
        <CloseOutlined />
      </button>
      {children}
    </Modal>
  );
}
