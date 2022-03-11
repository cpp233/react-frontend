import React, { useEffect, useRef } from 'react';

import { Card, Row, Col } from 'antd';

// import CPULine from './CPULine';
import CPUArea from './CPUArea2';
import MemPie from './MemPie2';
import ItemWordCloud from './ItemWordCloud';
import Style from './DashboardStyle';

import logger from '../../../utils/logger';
import { getHardwareMonitor } from '../../../services/hardwareMonitor';

const Dashboard = () => {
  const memPieEl = useRef(null);
  const CPUAreaEl = useRef(null);

  const updateChart = ({ cpuUseQueue }) => {
    return jsonObj => {
      // logger.info('jsonObj:', jsonObj);
      const curMemoryUse = jsonObj.memoryUse;
      const curCpuUse = jsonObj.cpuUse;

      const CPUAreaRef = CPUAreaEl.current.getChart();
      // logger.info('CPUArea ref: ', CPUAreaRef);
      const memPieRef = memPieEl.current.getChart();
      // logger.info('MemPie ref: ', memPieRef);

      const time = new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
      });

      if (cpuUseQueue.length >= 60) {
        cpuUseQueue.shift();
      }
      cpuUseQueue = cpuUseQueue.concat({
        time: time,
        use: parseInt(curCpuUse.user) + parseInt(curCpuUse.sys),
        type: 'CPU',
      });

      if (CPUAreaRef) {
        CPUAreaRef.changeData(cpuUseQueue);
      }

      if (memPieRef) {
        memPieRef.changeData([
          {
            type: '已使用',
            value: curMemoryUse.use,
            unit: curMemoryUse.useUnit,
          },
          {
            type: '未使用',
            value: curMemoryUse.free,
            unit: curMemoryUse.freeUnit,
          },
        ]);
      }
    };
  };

  useEffect(() => {
    let cpuUseQueue = [];
    let ws = null;

    const fetchData = async () => {
      ws = await getHardwareMonitor();
      ws.addPollingFn(updateChart({ cpuUseQueue }));
      ws.joinPolling();
    };
    fetchData();
    return () => {
      logger.info('Dashboard.unmount:');
      ws.close();
    };
  }, []);

  return (
    <Style>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <CPUArea ref={CPUAreaEl}></CPUArea>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <MemPie ref={memPieEl}></MemPie>
          </Card>
        </Col>
      </Row>
      <Row gutter={6} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title='Item 词云' small='small'>
            <ItemWordCloud></ItemWordCloud>
          </Card>
        </Col>
      </Row>
    </Style>
  );
};

export default Dashboard;
