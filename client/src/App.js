import React from 'react';
import { Layout, Button, Menu } from 'antd';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { logout } from './store/reducers/loggedInSlice';
import Todo from './todos/pages/Todo';
import Signup from './users/pages/Signup';
import Signin from './users/pages/Signin';

import './App.css';
export default function App() {
  const dispatch = useDispatch();
  const { Header, Content } = Layout;
  const loggedIn = useSelector((state) => state.loggedIn);
  const isLoggedIn = Object.keys(loggedIn).length > 0;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Layout className="layout">
      <Header className="header">
        {isLoggedIn && (
          <div className="nav">
            <h1
              style={{ color: 'white' }}
            >{`Hello ${loggedIn.username} 👋`}</h1>{' '}
            <Button danger onClick={logoutHandler}>
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
