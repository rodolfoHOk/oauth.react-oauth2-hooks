import React from 'react';
import { useAuth } from '../../context/auth';

const Login = () => {
  const { Login } = useAuth();

  function handleLogin(){
    Login('fulano','1234');
  }

  return(
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
