import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Login from '../pages/login';

const SignRoutes = () => {
  return(
    <BrowserRouter>
      <Route path="/"><Redirect to="/login" /></Route>
      <Route path="/login" component={Login} />
    </BrowserRouter>
  );
}

export default SignRoutes;