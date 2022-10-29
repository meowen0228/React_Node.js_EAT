import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import * as API from '../../service/API';
import '../../style/order.scss';

const { Meta } = Card;

function StoreList() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cartList, setCartList, store, setStore] = useOutletContext();
  const next = (id) => {
    if (store !== id) {
      setCartList([]);
    }
    setStore(id);
    navigate(`/home/food/${id}`);
  };
  const fetchData = async () => {
    const newVerify = {
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
    };
    const result = await API.ShowStore(newVerify);
    if (result.code === 1) {
      setList(result.data);
    }
    if (result.code !== 1) {
      navigate('/');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
      <div className="item-area">
        {list.length ? (
          list.map((v) => (
            <Card
              key={v.id}
              style={{
                width: 200,
              }}
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              actions={[<RightOutlined key="addItem" onClick={() => next(v.id)} />]}
            >
              <Meta title={v.name} description={v.description} />
              <p>{v.phone}</p>
              <p>{v.address}</p>
            </Card>
          ))
        ) : (
          <p>no data</p>
        )}
      </div>
    </div>
  );
}

export default StoreList;
