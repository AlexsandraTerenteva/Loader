import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ isAuth, children }) {
  return (isAuth ? children : <Navigate to="/login" />);
}
