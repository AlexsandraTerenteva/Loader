import { Routes, Route } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import FormRegister from './components/Form/FormRegister';
import FormLogin from './components/Form/FormLogin';
import MainLayout from './components/MainLayout';
import ErrorsMessage from './components/ErrorsMessage';
import './App.css';
import * as actions from './redux/actions/users';
import PrivateRoute from './components/PrivateRouter';

function App() {
  const { user } = useSelector((state) => state);
  const [isAuth, setIsAuth] = useState(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authUserCheckThunk());
  }, [dispatch]);

  useEffect(() => {
    setIsAuth(user);
  }, [user]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route
            path="feed"
            element={(
              <PrivateRoute isAuth={isAuth}>
                <MainLayout />
              </PrivateRoute>
            )}
          />
          <Route
            path="login"
            element={(
              <PrivateRoute isAuth={isAuth}>
                <FormLogin />
              </PrivateRoute>
          )}
          />
          <Route path="registrate" element={<FormRegister />} />
        </Route>
        <Route path="*" element={<ErrorsMessage />} />
      </Routes>
    </div>
  );
}

export default App;
