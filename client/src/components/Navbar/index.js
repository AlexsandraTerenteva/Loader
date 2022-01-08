import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutOutlined, GlobalOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';
import * as actions from '../../redux/actions/users';

export default function Navbar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const logoutHandler = () => {
    axios.get('/api/auth/logout', { withCredentials: true })
      .then(() => {
        dispatch(actions.logoutUser());
        navigator('/login', { replace: false });
      })
      .catch((err) => console.log(err));
  };

  if (user) {
    return (
      <nav className="nav-wrapper">
        <Link to="/"><GlobalOutlined /></Link>
        <span>
          {' '}
          {' '}

          Привет,
          {' '}
          {user.name}
          !
          {' '}
          {' '}
        </span>
        <button className="btn-logout" type="button" onClick={logoutHandler}>
          Выход
          {' '}
          {' '}
          <LogoutOutlined />
        </button>
      </nav>

    );
  }

  return (
    <nav>
      <Link to="/login">Вход</Link>
      {' '}
      {' '}
      <Link to="/registrate">Регистрация</Link>
    </nav>
  );
}
