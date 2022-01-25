import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../Form.css';
import { useNavigate } from 'react-router';
import * as actions from '../../../redux/actions/files';

export default function FormAddFile({ onRequestClose }) {
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(actions.addFilesThunk(img));
      onRequestClose();
    } catch (error) {
      console.log('error', error);
      navigator('/error');
    }
  };
  return (
    <div className="form-wrapper">
      <form className="form form-register" onSubmit={onSubmit}>
        <div>
          <label htmlFor="file">
            <input onChange={(e) => setImg(e.target.files[0])} type="file" name="filedata" id="file" />
          </label>
        </div>
        <button className="btn-submit" type="submit">Загрузить</button>
      </form>
    </div>
  );
}
