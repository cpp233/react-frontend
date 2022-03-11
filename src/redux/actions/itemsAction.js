import { getList, modifyOneById, createOne } from '../../services/items';

export const getItemsList = params => {
  return async dispatch => {
    const items = await getList({ ...params });
    dispatch({
      type: 'INIT_ITEMS',
      data: items,
    });
  };
};

export const modifyItem = params => {
  return async dispatch => {
    const item = await modifyOneById(params.id, params.data);
    dispatch({
      type: 'MODIFY_ITEM',
      data: item,
    });
  };
};

export const createItem = params => {
  return async dispatch => {
    const item = await createOne(params.data);
    dispatch({
      type: 'CREATE_ITEM',
      data: item,
    });
  };
};
