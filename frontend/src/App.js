// React
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// CSS
import './style/login.scss';
import 'antd/dist/antd.css';

// Page
import Login from './page/Login';
import Signin from './page/Signin';
import Home from './page/HomePage/Home';
import StoreList from './page/HomePage/StoreList';
import FoodList from './page/HomePage/FoodList';
import Account from './page/HomePage/Account';
import Order from './page/HomePage/Order';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.common.Authorization = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/home" element={<Home />}>
        <Route path="order" element={<Order />} />
        <Route path="account" element={<Account />} />
        <Route path="food/:id" element={<FoodList />} />
        <Route index element={<StoreList />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
