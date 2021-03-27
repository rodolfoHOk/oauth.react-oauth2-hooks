import React, { useState, useContext, useEffect } from 'react';
import authLogin from '../services/authLogin';
import jwt_decode from 'jwt-decode';
import httpApiClient from '../services/httpApiClient';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const userStoraged = localStorage.getItem('@username');
    const tokenStoraged = localStorage.getItem('@access_token');
    if ( userStoraged && tokenStoraged ) {
      setUser(userStoraged);
      httpApiClient.defaults.headers.Authorization = `Bearer ${JSON.parse(tokenStoraged).data.access_token}`;
    }
  }, []);
  
  async function Login(username, password) {
    await authLogin(username, password)
    .then(
      response => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('@access_token', access_token);
        const username = jwt_decode(response.data.access_token).preferred_username;
        setUser(username);
        localStorage.setItem('@username', user);
        const realmRoles = jwt_decode(response.data.access_token).realm_access.roles;
        const rolesUsuario = [];
        if(realmRoles.includes('app-user')){
          rolesUsuario.push('usuario');
        }
        if(realmRoles.includes('app-admin')){
          rolesUsuario.push('administrador');
        }
        setRoles(rolesUsuario);
        httpApiClient.defaults.headers.Authorization = `Bearer ${response.data.access_token}`;
      }).catch(
        error => {
          console.log(error);
      });
  }
  
  function Logout(){
    setUser(null);
    localStorage.removeItem('@access_token');
    localStorage.removeItem('@username');
    httpApiClient.defaults.headers.Authorization = 'Bearer ';
  }
  
  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, roles, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const context = useContext(AuthContext);
  return context;
}
