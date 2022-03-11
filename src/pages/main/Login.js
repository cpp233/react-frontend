import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Centering from '../../components/Centering';
import Gradients from '../../components/Gradients';

import { login } from '../../services/login';
import { setUser } from '../../utils/auth';
import logger from '../../utils/logger';

const Login = () => {
  const history = useHistory();

  const loginHandler = async values => {
    try {
      const result = await login({
        username: values.username,
        password: values.password,
      });
      setUser(result, values.remember);
      message.success('登录成功');
      history.push('/');
    } catch (error) {
      logger.error([error]);
      message.error(error.data.error);
    }
  };

  return (
    <Gradients>
      <Centering width='20' maxWidth='20'>
        <Card title='登陆' className='login-card-form'>
          <Form
            name='normal_login'
            className='login-form'
            initialValues={{
              remember: true,
            }}
            onFinish={loginHandler}
          >
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='用户名'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className='site-form-item-icon' />}
                type='password'
                placeholder='密码'
                autoComplete='true'
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>记住登陆状态</Checkbox>
              </Form.Item>
              <a className='login-form-forgot' href='/register'>
                没有账号？立即注册
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                block
                type='primary'
                htmlType='submit'
                className='login-form-button'
              >
                登陆
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Centering>
    </Gradients>
  );
};

export default Login;
