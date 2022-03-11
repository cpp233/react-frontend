const initNotices = () => {
  const notices = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  return notices.map((notice, index) => {
    return {
      id: index,
      notice,
      isRead: false,
    };
  });
};

const noticesReducer = (state = initNotices(), action) => {
  switch (action.type) {
    case 'READ_NOTICE':
      return state.map(notice => {
        if (notice.id === action.data.id) {
          notice.isRead = true;
        }
        return notice;
      });
    case 'READ_NOTICES':
      return state.map(notice => {
        notice.isRead = true;
        return notice;
      });

    default:
      return state;
  }
};

export default noticesReducer;
