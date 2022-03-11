import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
  Modal,
  Card,
  message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import Centering from '../../components/Centering';

import { createOneUser } from '../../services/user';
import logger from '../../utils/logger';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    xl: {
      span: 24,
    },
    xxl: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    xxl: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    xxl: {
      span: 24,
      offset: 0,
    },
  },
};

const Register = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async values => {
    logger.info('Received values of form: ', values);
    try {
      const result = await createOneUser({
        username: values.username,
        password: values.password,
      });
      logger.info('Received values of form: ', result);
      message.success('注册成功');
      history.push('/');
    } catch (error) {
      logger.error([error]);
      message.error(error.data.error);
    }
  };

  return (
    <Centering>
      <Card title='注册' className='register-card-form'>
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          initialValues={{}}
          scrollToFirstError
        >
          <Form.Item
            name='username'
            label={
              <span>
                用户名&nbsp;
                <Tooltip title='用户名'>
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            rules={[
              {
                required: true,
                message: '请输入用户名',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='password'
            label='密码'
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name='confirm'
            label='确认密码'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '确认密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码不一致');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type='primary' htmlType='submit'>
              注册
            </Button>
          </Form.Item>

          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('请勾选'),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              我已阅读并同意相关服务条款{' '}
              <a
                href='/readme'
                onClick={e => {
                  e.preventDefault();
                  Modal.info({
                    title: '服务条款',
                    content: (
                      <div>
                        <p>服务条款...服务条款...</p>
                        <p>服务条款...服务条款...</p>
                        <p>服务条款...服务条款...</p>
                      </div>
                    ),
                    onOk() {},
                  });
                }}
              >
                服务条款
              </a>
            </Checkbox>
          </Form.Item>
        </Form>
      </Card>
    </Centering>
  );
};

export default Register;
