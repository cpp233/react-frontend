import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Frame from './components/Frame/Frame';
import { adminRoutes } from './routers/routers';
import { isLogin } from './utils/auth';

const App = () => {
  const RoutesPage = () => {
    return (
      <Switch>
        {adminRoutes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.component}
            ></Route>
          );
        })}
        <Redirect to={adminRoutes[0].path} from='/admin' exact></Redirect>
        <Redirect to='/404'></Redirect>
      </Switch>
    );
  };

  return isLogin() ? (
    <Frame Page={<RoutesPage />}></Frame>
  ) : (
    <Redirect to='/login'></Redirect>
  );
};

export default App;
