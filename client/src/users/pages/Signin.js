import React from 'react';
import { Card } from 'antd';
import './SigninForm.css';
import Login from '../components/Login';

export default function Signin() {
  return (
    <div className="form-container">
      <Card hoverable title="Sign In">
        <Login />
      </Card>
    </div>
  );
}
