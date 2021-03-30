import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Home from '../pages/home';
import BuscarUsuario from '../pages/usuarios/buscar';
import CadastrarUsuario from '../pages/usuarios/cadastrar';

const OtherRoutes = () => {
  return(
    <BrowserRouter>
      <Route path="/"><Redirect to="/home" /></Route>
      <Route path="/home" component={Home} />
      <Route path="/usuarios/buscar" component={BuscarUsuario} />
      <Route path="/usuarios/cadastrar" component={CadastrarUsuario} />
    </BrowserRouter>
  );
}

export default OtherRoutes;