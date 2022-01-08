import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './FormRegister.css';

import * as actions from '../../redux/actions/users';

const initialState = {
  email: '',
  password: '',
};

export default function FormLogin() {
  const [user, setUser] = useState(initialState);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handlerValueInput = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/auth/login', user);
    if (data) {
      dispatch(actions.authUser(data));

      navigator('/feed', { replace: true });
    }
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2 className="form-title">Вход</h2>
        <form className="form form-register" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">
              <input onChange={handlerValueInput} value={user.email} type="email" name="email" id="email" placeholder="Ведите вашу почту..." />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <input onChange={handlerValueInput} value={user.password} type="password" name="password" id="password" placeholder="Ведите пароль..." />
            </label>
          </div>
          <button className="btn-submit" type="submit">Вход</button>
        </form>
      </div>
    </div>
  );
}
