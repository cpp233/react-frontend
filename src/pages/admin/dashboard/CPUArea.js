import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Area } from '@ant-design/charts';

// import logger from '../../../utils/logger';

const CPUArea = () => {
  const [cpuUse, loading] = useSelector(state => {
    return [state.serverLoad.cpuUse, state.serverLoad.loading];
  });
  const [ref, setRef] = useState(null);
  const [config] = useState({
    data: [],
    // height: 300,
    xField: 'time',
    yField: 'use',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return v + '%';
        },
      },
    },
    colorField: 'type',
    color: ({ type }) => {
      if (type === 'CPU') {
        return '#1890FF';
      }
      return 'red';
    },
    // point: {
    //   size: 2,
    //   shape: 'diamond',
    // },
    // smooth: 'smooth',
    animation: {
      // 图表第一次加载时的入场动画
      appear: {
        duration: 100,
        animation: 'position-update',
        delay: 100,
      },
      // 图表绘制完成，发生更新后，产生的新图形的进场动画
      enter: {
        duration: 100,
        animation: 'path-in',
        delay: 100,
      },
      // 图表绘制完成，数据发生变更后，有状态变更的图形的更新动画
      update: {
        duration: 500,
        animation: 'position-update',
        delay: 500,
      },
      // 图表绘制完成，数据发生变更后，被销毁图形的销毁动画
      leave: {
        duration: 100,
        animation: 'zoom-out',
        delay: 100,
      },
    },
    meta: {
      use: {
        min: 0,
        max: 100,
        tickCount: 10,
      },
      time: {
        tickCount: 10,
      },
    },
    // showCrosshairs: true,
  });

  if (!loading && ref) {
    // logger.info('CPUArea:', ref);
    ref.changeData(cpuUse);
  }

  return (
    <Area
      {...config}
      chartRef={chartRef => {
        setRef(chartRef);
      }}
    />
  );
};

export default CPUArea;
