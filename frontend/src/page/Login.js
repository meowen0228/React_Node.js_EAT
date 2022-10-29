import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, message, Form } from 'antd';
import * as API from '../service/API';
import '../style/login.scss';

function Login() {
  const navigate = useNavigate();
  const error = (msg) => {
    message.error(msg);
  };
  const toSignin = () => {
    navigate('/signin');
  };
  const onFinish = async (values) => {
    const result = await API.Login(values);
    if (result.code !== 1) {
      error(result.msg);
    } else {
      localStorage.setItem('userName', values.userName);
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('id', result.data.id);
      navigate('/home');
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (localStorage.getItem('userName') && localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);
  return (
    <div className="login">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登入
          </Button>
          <Button type="normal" htmlType="button" onClick={toSignin}>
            註冊
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
