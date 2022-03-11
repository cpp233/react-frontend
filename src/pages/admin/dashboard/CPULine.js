// 废弃，使用react封装的

import React, { useState, useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

import { getServerLoad } from '../../../services/serverLoad';
import logger from '../../../utils/logger';

const CPULine = () => {
  const ref = useRef();
  const [data, setData] = useState([]);
  const [chart, setChart] = useState(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    logger.info(this, ref);
    const chart = new Chart({
      container: 'container',
      forceFit: true,
      // width: ref.current.clientWidth,
      height: 300,
    });
    setChart(chart);
    setTimeout(() => {
      chart.forceFit();
    }, 0);
    logger.info(ref.current.clientWidth, ref.current.clientHeight);
  }, [setData, setChart]);

  if (chart) {
    chart.data(data, {
      type: {
        type: 'cat',
      },
    });

    chart.scale('use', {
      type: 'linear',
      min: 0,
      max: 100,
      tickCount: 10,
    });

    chart
      .line()
      .position('time*use')
      .shape('smooth')
      .color('use', ['#1890ff'])
      .style({
        lineWidth: 2,
      });

    chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });

    chart.render();

    if (!load) {
      setLoad(true);
      setInterval(async () => {
        const res = await getServerLoad();
        if (data.length >= 100) {
          data.shift();
        }
        data.push({
          time: res.time,
          use: parseInt(res.user) + parseInt(res.sys),
          type: 'CPU',
        });
        setData(data);
        logger.info(data);
        chart.changeData(data);
      }, 1000);
    }
  }

  return <div id='container' ref={ref}></div>;
};

export default CPULine;
