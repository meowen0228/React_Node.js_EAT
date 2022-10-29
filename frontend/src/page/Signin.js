import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import {} from '@ant-design/icons';
import * as API from '../service/API';
import '../style/login.scss';

function Signin() {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 10,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 14,
        offset: 10,
      },
    },
  };
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const error = (msg) => {
    message.error(msg);
  };
  const onFinish = async (values) => {
    const result = await API.AddUser(values);
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
  const toLogin = () => {
    navigate('/');
  };
  return (
    <div className="login">
      <Form
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <Form.Item
          name="userName"
          label="UserName"
          hasFeedback
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Please input your userName!',
            },
            () => ({
              async validator(_, value) {
                const result = await API.CheckUserName({ userName: value });
                if (!result.data) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('This UserName Already Exist!'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
            () => ({
              async validator(_, value) {
                const result = await API.CheckEmail({ email: value });
                if (!result.data) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('This Email Already Exist!'));
              },
            }),
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            註冊
          </Button>
          <Button type="normal" htmlType="button" onClick={toLogin}>
            已有帳號
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signin;
