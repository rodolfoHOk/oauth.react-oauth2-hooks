import React from 'react';
import { useAuth } from '../context/auth';
import OtherRoutes from './otherRoutes';

import SignRoutes from './signRoutes';

function Routes(){
  const { signed } = useAuth();

  return signed ? <OtherRoutes /> : <SignRoutes />;
}

export default Routes;
