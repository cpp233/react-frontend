import { getServerLoad } from '../../services/serverLoad';

export const updateServerLoad = () => {
  return async dispatch => {
    const serverLoad = await getServerLoad();
    const now = new Date();
    const time = now.toLocaleTimeString('zh-CN', {
      hour12: false,
    });
    dispatch({
      type: 'UPDATE_SERVER_LOAD',
      data: { ...serverLoad, time },
    });
  };
};
