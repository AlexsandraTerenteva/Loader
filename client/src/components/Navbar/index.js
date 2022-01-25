import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutOutlined, GlobalOutlined } from '@ant-design/icons';
import * as actions from '../../redux/actions/users';

export default function Navbar() {
  const { data } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const logoutHandler = () => {
    dispatch(actions.logoutUserThunk());
    navigator('/');
  };

  if (data?.name) {
    return (
      <>
        <nav className="nav-wrapper">
          <Link to="/feed"><GlobalOutlined /></Link>
          <span>
            {' '}
            {' '}

            Привет,
            {' '}
            {data?.name}
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
        <Outlet />
      </>
    );
  }

  return (
    <nav className="nav-auth">
      <Link to="/login" key="login">Вход</Link>
      {' '}
      {' '}
      <Link to="/registrate" key="registrate">Регистрация</Link>
      <Outlet />
    </nav>
  );
}
