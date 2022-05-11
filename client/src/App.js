import React from 'react';
import { Layout, Button, Menu } from 'antd';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { reset } from './store/reducers/loggedInSlice';
import Todo from './todos/pages/Todo';
import Signup from './users/pages/Signup';
import Signin from './users/pages/Signin';

import { LogoutOutlined } from '@ant-design/icons';
import './App.css';
import { Footer } from 'antd/lib/layout/layout';
export default function App() {
  const dispatch = useDispatch();
  const { Header, Content } = Layout;
  const loggedInUser = useSelector((state) => state.loggedIn);
  const isLoggedIn = loggedInUser.user !== undefined;

  const logoutHandler = () => {
    dispatch(reset());
  };
  return (
    <Layout className="layout">
      <Header className="header">
        {isLoggedIn && (
          <div className="nav">
            <h1
              style={{ color: 'white' }}
            >{`Hello ${loggedInUser.user.username} 👋`}</h1>
            <Button
              shape="round"
              danger
              onClick={logoutHandler}
              icon={<LogoutOutlined />}
            >
              LOG OUT
            </Button>
          </div>
        )}
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/todo"
            element={isLoggedIn ? <Todo /> : <Navigate to="/" />}
          />
        </Routes>
      </Content>
    </Layout>
  );
}
