import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { createAccountAsync, reset } from '../../store/reducers/registerSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import AlertPop from '../../shared/AlertPop';
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseStatus = useSelector((state) => state.register.responseStatus);
  const [alertStatus, setAlertStatus] = useState({
    isSucceed: responseStatus === 'success',
    showAlert: false,
  });

  useEffect(() => {
    if (responseStatus === 'success') {
      setAlertStatus({ showAlert: true, isSucceed: true });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setAlertStatus({ showAlert: true, isSucceed: false });
    }
    console.log(alertStatus.isSucceed);
  }, [responseStatus]);

  useEffect(() => () => dispatch(reset()), []);

  const onFinish = (values: any) => {
    dispatch(
      createAccountAsync({
        username: values.username,
        password: values.password,
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onClose = () => {
    dispatch(reset());
  };
  const alertPop = alertStatus.showAlert && responseStatus !== '' && (
    <AlertPop
      message={alertStatus.isSucceed ? 'Register Succeed' : 'Register Failed'}
      description={responseStatus}
      type={alertStatus.isSucceed ? 'success' : 'error'}
      onClose={onClose}
    />
  );
  return (
    <>
      {alertPop}
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password "
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 12,
            span: 14,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '10px' }}
            htmlType="submit"
            disabled={alertStatus.isSucceed}
          >
            Confirm
          </Button>
          <Button htmlType="submit" onClick={() => navigate('/')}>
            {alertStatus.isSucceed ? 'Login' : 'Cancel'}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
