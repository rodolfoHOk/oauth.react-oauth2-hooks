import React from 'react';
import { useAuth } from '../context/auth';
import OtherRoutes from './otherRoutes';

import SignRoutes from './signRoutes';

const Routes = () => {
  const { signed } = useAuth();

  return signed ? <OtherRoutes /> : <SignRoutes />;
}

export default Routes;
