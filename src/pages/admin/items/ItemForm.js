import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Card, Input, Switch, InputNumber, Button, message } from 'antd';
const { TextArea } = Input;
import { useRemark } from 'react-remark';

import { modifyItem, createItem } from '../../../redux/actions/itemsAction';
import { getOneById } from '../../../services/items';
import logger from '../../../utils/logger';
import { nameRules, quantityRules } from './rules';

const ItemForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [sourceContent, setSourceContent] = useState();
  const [isPreview, setPreview] = useState(false);
  const [markdownContent, setMarkdownSource] = useRemark();

  const validateMessages = {
    // required: "'${name}' 是必选字段",
  };
  useEffect(() => {
    logger.info('ItemForm.useEffect:', id);
    if (id) {
      getOneById(id)
        .then(res => {
          form.setFieldsValue(res);
          setSourceContent(res.content);
          setMarkdownSource(res.content);
        })
        .catch(err => {
          logger.error(err);
          message.error('加载数据出错');
        });
    }
  }, [id, dispatch, form]);

  const submitHandler = async data => {
    data.content = sourceContent;
    logger.info('ItemForm.Form.data:', data);
    try {
      if (id) {
        await dispatch(modifyItem({ id, data }));
      } else {
        await dispatch(createItem({ data }));
      }
      message.success('操作成功');
    } catch (e) {
      logger.error(e);
      logger.error(e, e.data.error);
      message.error(`提交失败:${e.data.error}`);
    }
  };

  return (
    <Card
      title='Item 编辑'
      extra={<Button onClick={() => history.goBack()}>返回</Button>}
    >
      <Form
        form={form}
        validateMessages={validateMessages}
        onFinish={submitHandler}
        onFinishFailed={() => message.error('输入内容不正确')}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label='Item 名称' name='name' rules={nameRules}>
          <Input placeholder='请输入 Item 名称'></Input>
        </Form.Item>
        <Form.Item label='Item 数量' name='quantity' rules={quantityRules}>
          <InputNumber
            placeholder='请输入 Item 数量'
            style={{ width: '100%' }}
          ></InputNumber>
        </Form.Item>
        <Form.Item label='Item 内容描述'>
          <>
            <Switch
              checked={isPreview}
              checkedChildren='输入'
              unCheckedChildren='预览'
              onChange={() => {
                setPreview(!isPreview);
              }}
            />
            {isPreview ? (
              <Card style={{ height: 500 }}>{markdownContent}</Card>
            ) : (
              <TextArea
                style={{ height: 500 }}
                onChange={({ currentTarget }) => {
                  setSourceContent(currentTarget.value);
                  setMarkdownSource(currentTarget.value);
                }}
                value={sourceContent}
              />
            )}
          </>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type='primary' htmlType='submit'>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ItemForm;
