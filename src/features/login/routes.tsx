import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const Login = lazy(() => import('.'));

function LoginRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default LoginRoutes;
