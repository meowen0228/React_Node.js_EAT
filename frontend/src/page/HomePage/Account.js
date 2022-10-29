import React, { useState, useEffect } from 'react';
import {} from 'react-router-dom';
import { Button, Form, Input, InputNumber, message } from 'antd';
import * as API from '../../service/API';
import '../../style/account.scss';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

function Account() {
  const [fields, setFields] = useState([]);
  const fetchData = async () => {
    const data = {
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
    };
    const result = await API.GetUser(data);
    if (result) {
      const newFields = [
        {
          name: ['userName'],
          value: result.data.userName,
        },
        {
          name: ['email'],
          value: result.data.email,
        },
        {
          name: ['phone'],
          value: result.data.phone,
        },
        {
          name: ['city'],
          value: result.data.city,
        },
        {
          name: ['age'],
          value: result.data.age,
        },
      ];
      setFields([...newFields]);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onFinish = async (values) => {
    console.log(values);
    const param = {
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
      data: {
        id: Number(localStorage.getItem('id')),
        ...values,
      },
    };
    const result = await API.UpdateUser(param);
    console.log(result);
    message.success('Success');
  };
  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <div className="account-area">
        <Form
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...layout}
          fields={fields}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="userName"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
              },
              {
                required: true,
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                type: 'phone',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                type: 'city',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                type: 'age',
                min: 0,
                max: 99,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Account;
