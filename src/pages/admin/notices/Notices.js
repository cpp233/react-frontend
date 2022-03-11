import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, List, Typography, Button, Badge } from 'antd';

import { readNotice, readNotices } from '../../../redux/actions/noticesAction';

function Notices() {
  const dispatch = useDispatch();
  const notices = useSelector(state => {
    return state.notices;
  });

  return (
    <Card
      title='通知中心'
      extra={
        <Button
          size='small'
          onClick={() => {
            dispatch(readNotices());
          }}
        >
          全部已读
        </Button>
      }
    >
      <List
        bordered
        dataSource={notices}
        renderItem={item => (
          <List.Item
            style={{
              display: 'flex,',
              alignContent: 'space-between',
            }}
          >
            <div>
              <Typography.Text mark>[ITEM]</Typography.Text> {item.notice}
            </div>

            <Badge dot={!item.isRead}>
              <Button
                size='small'
                onClick={() => {
                  dispatch(readNotice({ id: item.id }));
                }}
              >
                已读
              </Button>
            </Badge>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default Notices;
