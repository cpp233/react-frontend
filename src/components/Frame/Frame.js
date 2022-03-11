import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Dropdown, Avatar, message, Badge } from 'antd';
const { Header, Content, Sider } = Layout;
import { DownOutlined } from '@ant-design/icons';
import './Frame.css';

import { adminRoutes } from '../../routers/routers';
import { clearUser } from '../../utils/auth';
import logger from '../../utils/logger';

const routes = adminRoutes.filter(route => route.isShow);

function Frame({ Page }) {
  const hasNotices = useSelector(state => {
    // 返回数组会导致每次检测到新结果，不停的刷新此界面
    return (
      state.notices.filter(notice => {
        return !notice.isRead;
      }).length > 0
    );
  });
  const history = useHistory();
  const popMenu = (
    <Menu
      onClick={p => {
        switch (p.key) {
          case 'logout':
            logger.info(history);
            clearUser();
            history.go('/');
            break;
          case 'notices':
            history.push('/admin/notices');
            break;
          default:
            message.info(p.key);
            break;
        }
      }}
    >
      <Menu.Item key='notices'>通知中心</Menu.Item>
      <Menu.Item key='logout'>退出</Menu.Item>
    </Menu>
  );

  const Logo = () => {
    return (
      <div className='logo'>
        <img
          src={
            'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
          }
          alt={'logo'}
        />
      </div>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className='header'>
        <Logo></Logo>
        <Dropdown className='dropdown' overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            <Badge dot={hasNotices}>
              <span style={{ color: 'white' }}>超级管理员</span>
            </Badge>

            <DownOutlined className='downLine' style={{ color: 'white' }} />
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {routes.map(route => {
              return (
                <Menu.Item
                  key={route.path}
                  icon={route.icon}
                  onClick={p => {
                    history.push(p.key);
                  }}
                >
                  {route.title}
                </Menu.Item>
              );
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: '10px' }}>
          <Content
            className='site-layout-background'
            style={{
              padding: '24 ,24, 24',
              margin: 0,
              minHeight: 280,
            }}
          >
            {Page}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Frame;
