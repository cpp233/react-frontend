import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import itemsReducer from './reducers/itemsReducer';
import noticesReducer from './reducers/noticesReducer';
import serverLoadReducer from './reducers/serverLoadReducer';

// import logger from '../utils/logger';

const reducers = combineReducers({
  items: itemsReducer,
  notices: noticesReducer,
  serverLoad: serverLoadReducer,
});

// 自己实现 redux-thunk
// function myMiddleware(storeAPI) {
//   return next => action => {
//     logger.info('myMiddleware:storeAPI :', typeof storeAPI, storeAPI);
//     logger.info('myMiddleware:next :', typeof next, next);
//     logger.info('myMiddleware:action:', typeof action, action);
//     if (action instanceof Function) {
//       return action(storeAPI.dispatch, storeAPI.getState, storeAPI);
//     }
//     return next(action);
//   };
// }

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(
      // myMiddleware
      thunk.withExtraArgument('可能会需要的参数')
    )
  )
);

export default store;
