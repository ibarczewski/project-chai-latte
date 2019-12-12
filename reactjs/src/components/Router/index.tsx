import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
//import ProtectedRoute from './ProtectedRoute';
import utils from 'src/utils/utils';

const Router = () => {
  const UserLayout = utils.getRoute('/').component;
 // const AppLayout = utils.getRoute('/').component;

  return (
    <Switch>
      <Route path="/" render={(props: any) => <UserLayout {...props} />} />      
      {/* <ProtectedRoute path="/" render={(props: any) => <AppLayout {...props} exact />} /> */}
    </Switch>
  );
};

export default Router;
