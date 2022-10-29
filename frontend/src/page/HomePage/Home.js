import React, { useState, useCallback } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { CloseCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import {
  Button,
  Breadcrumb,
  Layout,
  Drawer,
  Menu,
  Form,
  Input,
  message,
  InputNumber,
} from 'antd';
import * as API from '../../service/API';
import '../../style/order.scss';

const { Header, Content, Footer } = Layout;

function Home() {
  const [cartList, setCartList] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [store, setStore] = useState(1);
  const navigate = useNavigate();
  const showDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);
  const delCartItem = (id) => {
    const index = cartList.findIndex((object) => object.id === id);
    const newCartList = [...cartList];
    newCartList.splice(index, 1);
    setCartList([...newCartList]);
  };
  const logout = () => {
    localStorage.clear();
    navigate('/');
  };
  const changeNumber = useCallback((id) => (value) => {
    const index = cartList.findIndex((object) => object.id === id);
    const newCartList = [...cartList];
    newCartList[index].qty = value;
    setCartList([...newCartList]);
  });
  const onFinish = async (values) => {
    const postList = JSON.parse(JSON.stringify(cartList));
    postList.forEach((v) => {
      /* eslint-disable no-param-reassign */
      delete v.id;
      delete v.name;
      delete v.price;
      /* eslint-enable no-param-reassign */
    });
    if (cartList.length < 1) {
      message.warning('Add Some Food');
    } else {
      const param = {
        userName: localStorage.getItem('userName'),
        token: localStorage.getItem('token'),
        data: {
          order: {
            store: { id: store },
            user: { id: Number(localStorage.getItem('id')) },
            ...values,
          },
          detail: postList,
        },
      };
      const result = await API.CreateOrder(param);
      if (result.code === 1) {
        message.success('Create Order Success');
        setCartList([]);
        setDrawerOpen(false);
        navigate('/home/order');
      }
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Header
        style={{
          width: '100%',
          color: 'white',
          position: 'fixed',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Menu theme="dark" mode="horizontal">
          <Menu.SubMenu key="SubMenu" icon={<UnorderedListOutlined />}>
            <Menu.Item key="account">
              <Link to="account">Account</Link>
            </Menu.Item>
            <Menu.Item key="order">
              <Link to="order">Order</Link>
            </Menu.Item>
            <Menu.Item key="food">
              <Link to="/home">Food</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={logout}>
              <p>Logout</p>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        EAT
        <Button type="primary" onClick={showDrawer}>
          Cart
        </Button>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Outlet context={[cartList, setCartList, store, setStore]} />
        <Drawer
          title="EAT EAT ..."
          placement="right"
          onClose={closeDrawer}
          open={drawerOpen}
        >
          <div>
            {cartList.length > 0 ? (
              cartList.map((v, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="cartListItem" key={i}>
                  <p>{v.id}</p>
                  <p>{v.name}</p>
                  <InputNumber min={1} max={30} value={v.qty} onChange={changeNumber(v.id)} />
                  <Button
                    onClick={() => delCartItem(v.id)}
                    icon={<CloseCircleOutlined />}
                    danger
                  />
                </div>
              ))
            ) : (
              <p>no food</p>
            )}
          </div>
          <div>
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
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: 'Please input your phone!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Address"
                name="deliveryAddress"
                rules={[
                  { required: true, message: 'Please input your address!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Delivery
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Drawer>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Home;
