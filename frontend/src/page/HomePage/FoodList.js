import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import * as API from '../../service/API';
import '../../style/order.scss';

const { Meta } = Card;

function FoodList() {
  // eslint-disable-next-line no-unused-vars
  const [cartList, setCartList, store, setStore] = useOutletContext();
  const [list, setList] = useState([]);
  const { id } = useParams();
  const addItem = (addId) => {
    const exist = cartList.findIndex((object) => object.id === addId);
    if (exist !== -1) {
      const editOne = [...cartList];
      editOne[exist].qty += 1;
    } else {
      const index = list.findIndex((object) => object.id === addId);
      const newOne = list[index];
      newOne.storeItem = { id: addId };
      newOne.qty = 1;
      setCartList([...cartList, newOne]);
    }
    message.success('Add Success');
  };
  const fetchData = async () => {
    const param = {
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
      id: id,
    };
    const result = await API.ShowStoreItem(param);
    if (result.code === 1) {
      setList(result.data);
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
              cover={(
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              )}
              actions={[<PlusCircleOutlined key="addItem" onClick={() => addItem(v.id)} />]}
            >
              <Meta title={v.name} description={v.price} />
            </Card>
          ))
        ) : (
          <p>no data</p>
        )}
      </div>
    </div>
  );
}

export default FoodList;
