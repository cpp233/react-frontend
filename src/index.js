import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// import 'antd/dist/antd.css';
import './index.css';

import store from './redux/store';
import { mainRoutes } from './routers/routers';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/admin'>
          <App />
        </Route>

        {mainRoutes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              component={route.component}
              exact={route.exact}
            ></Route>
          );
        })}

        <Redirect to='/admin' from='/' exact></Redirect>
        <Redirect to='/404'></Redirect>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
