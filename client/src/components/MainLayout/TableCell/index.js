/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import * as actions from '../../../redux/actions/files';

export default function TableCell({ el, openModal }) {
  const [fileName, setFileName] = useState(el.title);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const onChangeValue = (e) => {
    setFileName(e.target.value);
  };

  const deleteFile = (id) => {
    dispatch(actions.deleteFileThunk(id));
  };

  const editSaveFile = (id) => {
    dispatch(actions.editFileThunk({ id, fileName }));
    setIsEdit(false);
  };
  return (
    <tr key={el.id}>
      <td><img src={`${el.img_src}`} alt="mini-foto" className="preview-img" onClick={() => openModal(el.img_src)} /></td>
      {isEdit
        ? <td><input type="text" value={fileName} onChange={onChangeValue} /></td>
        : <td>{el.title}</td>}
      <td>{el.size}</td>
      <td>
        {isEdit
          ? <button type="button" className="btn-file" onClick={() => editSaveFile(el.id)}><SaveOutlined /></button>
          : <button type="button" className="btn-file" onClick={() => setIsEdit(true)}><EditOutlined /></button>}
        <button type="button" className="btn-file" onClick={() => deleteFile(el.id)}><DeleteOutlined /></button>
      </td>
    </tr>
  );
}

// export default memo(TableCell);
