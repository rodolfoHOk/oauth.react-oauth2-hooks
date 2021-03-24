import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/login';

function SignRoutes(){
  return(
    <BrowserRouter>
      <Route path="/" component={Login} />
    </BrowserRouter>
  );
}

export default SignRoutes;