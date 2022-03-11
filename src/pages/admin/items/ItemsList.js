import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Space, Card, Table, Button, Popconfirm, message } from 'antd';
import './ItemsList.css';

import { getItemsList, modifyItem } from '../../../redux/actions/itemsAction';
import { delOneById, createOne } from '../../../services/items';
import logger from '../../../utils/logger';
import { getFakerData } from '../../../utils/getFakerData';

const ItemsList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentpage, setCurrentPage] = useState(1);
  const items = useSelector(state => {
    logger.info('ItemsList Component.useSelector：', state.items);
    return state.items;
  });
  logger.info('ItemsList 组件：', items);
  useEffect(() => {
    dispatch(getItemsList({ page: 1 }));
  }, [dispatch]);

  const createFakerDataHandler = async () => {
    try {
      const data = getFakerData();
      // await dispatch(createItem({ data }));
      await createOne(data);
      message.success('操作成功');

      dispatch(getItemsList({ page: 1 }));
    } catch (e) {
      logger.error(e);
      logger.error(e, e.data.error);
      message.error(`提交失败:${e.data.error}`);
    }
  };

  const columns = [
    {
      title: '序号',
      key: 'id',
      width: 65,
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Item 名称',
      dataIndex: 'name',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
    {
      title: '状态',
      dataIndex: 'isShow',
      render: (txt, record) => {
        if (record.isShow) {
          return '显示';
        } else {
          return '隐藏';
        }
      },
    },
    {
      title: '操作',
      render: function opera(txt, record) {
        return (
          <div>
            <Button
              type='primary'
              size='small'
              onClick={() => {
                history.push(`/admin/items/edit/${record.id}`);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title='确定删除此项？'
              okText='删除'
              cancelText='取消'
              okButtonProps={{ danger: true }}
              onConfirm={async () => {
                await delOneById(record.id);
                await dispatch(getItemsList({ page: currentpage }));
                message.success('操作成功');
              }}
              onCancel={() => {}}
            >
              <Button style={{ margin: '0 1rem' }} danger size='small'>
                删除
              </Button>
            </Popconfirm>
            <Button
              size='small'
              onClick={async () => {
                await dispatch(
                  modifyItem({
                    id: record.id,
                    data: {
                      isShow: record.isShow ? false : true,
                    },
                  })
                );
                message.success('操作成功');
              }}
            >
              {record.isShow ? '隐藏' : '公开'}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Card title='Item 列表' extra={<div></div>}>
      <Space style={{ marginBottom: 16, float: 'right' }}>
        {process.env.NODE_ENV === 'development' && (
          <Button type='primary' size='small' onClick={createFakerDataHandler}>
            生成随机数据(dev)
          </Button>
        )}
        <Button
          type='primary'
          size='small'
          onClick={() => {
            history.push('/admin/items/edit');
          }}
        >
          新增
        </Button>
      </Space>
      <Table
        rowKey='id'
        rowClassName={record => (record.isShow ? '' : 'no-focus')}
        columns={columns}
        bordered
        dataSource={items.list}
        pagination={{
          total: items.loading ? 1 : items.totalCount,
          // defaultCurrent: items.defaultCurrent,
          defaultPageSize: 10,
          onChange: async page => {
            setCurrentPage(page);
            await dispatch(getItemsList({ page }));
          },
        }}
      ></Table>
    </Card>
  );
};

export default ItemsList;
