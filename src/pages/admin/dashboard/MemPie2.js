import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { Pie } from '@ant-design/charts';

import logger from '../../../utils/logger';

const MemPie = (props, ref) => {
  const memPieEl = useRef(null);

  useImperativeHandle(ref, () => ({
    getChart: memPieEl.current.getChart,
  }));

  const config = {
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
    chartRef: chartRef => {
      logger.info('MemPie:setRef', chartRef);
    },
  };

  return <Pie {...config} ref={memPieEl} />;
};

export default forwardRef(MemPie);
