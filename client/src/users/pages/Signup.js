import React from 'react';
import { Card } from 'antd';
import './SigninForm.css';
import Login from '../components/Login';
import Register from '../components/Register';
export default function Signup() {
  return (
    <div className="form-container">
      <Card hoverable title="Create Account">
        <Register />
      </Card>
    </div>
  );
}
