export const readNotice = params => {
  return async dispatch => {
    dispatch({
      type: 'READ_NOTICE',
      data: params,
    });
  };
};

export const readNotices = () => {
  return async dispatch => {
    dispatch({
      type: 'READ_NOTICES',
    });
  };
};
