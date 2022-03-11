import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { WordCloud } from '@ant-design/plots';

import { getItemsList } from '../../../redux/actions/itemsAction';
import logger from '../../../utils/logger';

const ItemWordCloud = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => {
    logger.info('ItemWordCloud Component.useSelector：', state.items);
    return state.items;
  });

  logger.info('ItemWordCloud Component items:', items);
  useEffect(() => {
    // asyncFetch();
    dispatch(getItemsList({ per: 50, page: 1 }));
  }, []);

  const config = {
    data: items.list,
    wordField: 'name',
    weightField: 'quantity',
    colorField: 'name',
    wordStyle: {
      fontFamily: 'Verdana',
      fontSize: [16, 64],
      rotation: 0,
    },
    // 返回值设置成一个 [0, 1) 区间内的值，
    // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
    random: () => {
      return Math.ceil(Math.random() * 10);
    },
  };

  return <WordCloud {...config} />;
};

export default ItemWordCloud;
