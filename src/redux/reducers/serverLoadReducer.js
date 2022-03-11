import logger from '../../utils/logger';

const serverLoadReducer = (
  state = { loading: true, cpuUse: [], memoryUse: {} },
  action
) => {
  switch (action.type) {
    case 'UPDATE_SERVER_LOAD':
      logger.info('serverLoadReducer.UPDATE_SERVER_LOAD:', state, action);
      if (state.cpuUse.length >= 60) {
        state.cpuUse.shift();
      }
      return {
        loading: false,
        cpuUse: state.cpuUse.concat({
          time: action.data.time,
          use:
            parseInt(action.data.cpuUse.user) +
            parseInt(action.data.cpuUse.sys),
          type: 'CPU',
        }),
        memoryUse: [
          {
            type: '已使用',
            value: action.data.memoryUse.use,
            unit: action.data.memoryUse.useUnit,
          },
          {
            type: '未使用',
            value: action.data.memoryUse.free,
            unit: action.data.memoryUse.freeUnit,
          },
        ],
      };
    default:
      return state;
  }
};

export default serverLoadReducer;
