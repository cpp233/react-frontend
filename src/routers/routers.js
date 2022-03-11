import React from 'react';
import { AreaChartOutlined, ShopOutlined } from '@ant-design/icons';

import Login from '../pages/main/Login';
import PageNotFound from '../pages/main/PageNotFound';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import ItemsList from '../pages/admin/items/ItemsList';
import ItemForm from '../pages/admin/items/ItemForm';
import Notices from '../pages/admin/notices/Notices';
import Register from '../pages/main/Register';

export const mainRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/404',
    component: PageNotFound,
  },
  {
    path: '/register',
    component: Register,
  },
];

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    component: Dashboard,
    exact: true,
    isShow: true,
    title: '看板',
    icon: <AreaChartOutlined />,
  },
  {
    path: '/admin/items',
    component: ItemsList,
    exact: true,
    isShow: true,
    title: 'Item 管理',
    icon: <ShopOutlined />,
  },
  {
    path: '/admin/items/edit/:id?', // ? 可选参数
    component: ItemForm,
    // exact: true,
    isShow: false,
  },
  {
    path: '/admin/notices',
    component: Notices,
    isShow: false,
  },
];
