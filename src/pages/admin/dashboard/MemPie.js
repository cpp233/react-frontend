import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Pie } from '@ant-design/charts';

import logger from '../../../utils/logger';

const MemPie = () => {
  const [memoryUse, loading] = useSelector(state => {
    return [state.serverLoad.memoryUse, state.serverLoad.loading];
  });
  const [ref, setRef] = useState(null);
  const [config] = useState({
    data: [],
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    // meta: {
    //   unit: {
    //     formatter: function formatter(v) {
    //       return ''.concat(v, ' \xA5');
    //     },
    //   },
    // },
    tooltip: {
      fields: ['unit'],
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      content: function content(_ref) {
        return _ref.unit;
      },
    },
    interactions: [
      { type: 'tooltip', enable: false },
      // { type: 'element-selected' },
      // { type: 'element-active' },
      // { type: 'pie-statistic-active' },
    ],
    statistic: {
      title: false,

      content: {
        style: {
          fontFamily: '微软雅黑',
          // fontWeight: 'normal',
          // fontSize: '20px',
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        customHtml: (container, view, datum, data) => {
          if (data.length > 0) {
            const use = data[0].value;
            const free = data[1].value;
            return `已使用\n${((use / (use + free)) * 100).toFixed()} %`;
          }
        },
      },
    },
  });

  if (!loading && ref) {
    logger.info('MemPie:', memoryUse);

    ref.changeData(memoryUse);
  }

  return (
    <Pie
      {...config}
      chartRef={chartRef => {
        setRef(chartRef);
      }}
    />
  );
};

export default MemPie;
