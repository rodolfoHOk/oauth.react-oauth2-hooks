import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuth } from '../context/auth';
import Home from '../pages/home';
import Login from '../pages/login';
import NaoAutorizado from '../pages/naoAutorizado';
import NaoEncontrada from '../pages/naoEncontrada';
import BuscarUsuario from '../pages/usuarios/buscar';
import CadastrarUsuario from '../pages/usuarios/cadastrar';

const Routes = () => {
  
  const { signed } = useAuth();

  const RoutePrivada = ({component, ...props}) => {
    const componentFinal = signed ? component : NaoAutorizado;
    return <Route {...props} component={componentFinal} />
  }

  return (
    <BrowserRouter>
      <Switch>
        { signed 
          ? 
          <Route exact path="/" component={Home} />
          :
          <Route exact path="/" component={Login} />
        }
        <RoutePrivada path="/usuarios/buscar" component={BuscarUsuario} />
        <RoutePrivada path="/usuarios/cadastrar" component={CadastrarUsuario} />
        <Route component={NaoEncontrada}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
