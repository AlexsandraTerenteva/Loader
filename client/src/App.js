import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import FormRegister from './components/Form/FormRegister';
import FormLogin from './components/Form/FormLogin';
import Navbar from './components/Navbar';
import MainLayout from './components/MainLayout';
import ErrorsMessage from './components/ErrorsMessage';
import * as actions from './redux/actions/users';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigator = useNavigate();

  useEffect(() => {
    axios.get('/api/auth', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        dispatch(actions.authUser(res.data));
        if (!res.data) {
          navigator('/login');
        }
      })
      .catch((er) => console.log(er));
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/registrate" element={!user && <FormRegister />} />
        <Route path="/login" element={!user && <FormLogin />} />
        <Route path="/feed" element={user && <MainLayout />} />
        <Route path="/error" element={<ErrorsMessage />} />
        <Route path="*" element={<ErrorsMessage />} />
      </Routes>
    </div>
  );
}

export default App;
