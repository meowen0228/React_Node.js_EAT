import React, { useEffect, useState } from 'react';
import { } from 'react-router-dom';
import { InfoCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Space, Button, Popconfirm, Modal } from 'antd';
import * as API from '../../service/API';
import '../../style/order.scss';

function Order() {
  const [order, setOrder] = useState([]);
  const [detail, setDetail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchOrderData = async () => {
    const param = {
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id'),
    };
    const result = await API.ShowOrder(param);
    if (result.code === 1) {
      setOrder(result.data);
    }
  };
  const fetchDetailData = async (param) => {
    const result = await API.ShowOrderDetail(param);
    if (result.code === 1) {
      setDetail(result.data);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, []);
  const showModal = async (id) => {
    setIsModalOpen(true);
    const param = {
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
      orderId: id,
    };
    fetchDetailData(param);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const delOrder = async (id) => {
    const param = {
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
      orderId: id,
    };
    const result = await API.DeleteOrder(param);
    if (result.code === 1) {
      fetchOrderData(param);
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type=""
            icon={<InfoCircleOutlined />}
            onClick={() => showModal(record.id)}
          />
          <Popconfirm
            title="Are you sure to delete this order?"
            onConfirm={() => {
              delOrder(record.id);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const columnsDetail = [
    {
      title: 'Name',
      dataIndex: ['storeItem', 'name'],
      key: 'name',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: ['storeItem', 'price'],
      key: 'price',
      align: 'center',
    },
    {
      title: 'Qty.',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={order}
        rowKey={(record) => record.id}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          columns={columnsDetail}
          dataSource={detail}
          rowKey={(record) => record.id}
          pagination={false}
        />
      </Modal>
    </>
  );
}

export default Order;
