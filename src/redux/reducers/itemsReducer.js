import logger from '../../utils/logger';

const itemsReducer = (state = { loading: true, list: [] }, action) => {
  switch (action.type) {
    case 'INIT_ITEMS':
      logger.info('itemsReducer.INIT_ITEMS:', state, action);
      return {
        loading: false,
        ...action.data,
      };
    case 'CREATE_ITEM':
      logger.info('itemsReducer.CREATE_ITEM:', state, action);
      state.list.shift();
      return {
        loading: false,
        list: state.list.concat(action.data),
      };

    case 'MODIFY_ITEM':
      logger.info('itemsReducer.MODIFY_ITEM:', state, action);
      return {
        ...state,
        list: state.list.map(item =>
          item.id !== action.data.id ? item : action.data
        ),
      };

    default:
      return state;
  }
};

export default itemsReducer;
