import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginAsync, reset } from '../../store/reducers/loggedInSlice';
import AlertPop from '../../shared/AlertPop';
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInStatus = useSelector((state) => state.loggedIn);
  const [alertStatus, setAlertStatus] = useState({
    isSucceed: loggedInStatus.username !== undefined,
    showAlert: false,
  });
  useEffect(() => {
    if (loggedInStatus.username !== undefined) {
      setAlertStatus({ isSucceed: true, showAlert: false });
      navigate('/todo');
    } else if (loggedInStatus.responseStatus) {
      setAlertStatus({ isSucceed: false, showAlert: true });
    }
  }, [loggedInStatus]);
  useEffect(
    () => () => setAlertStatus({ isSucceed: true, showAlert: false }),
    []
  );

  const onFinish = (values: any) => {
    dispatch(
      getLoginAsync({ username: values.username, password: values.password })
    );
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const onClose = () => {
    dispatch(reset());
  };
  const alertContent = alertStatus.showAlert && (
    <AlertPop
      message={alertStatus.isSucceed ? 'Log in Succeed' : 'Log in Failed'}
      description={loggedInStatus.responseStatus}
      type={alertStatus.isSucceed ? 'success' : 'error'}
      onClose={onClose}
    />
  );

  return (
    <>
      {alertContent}
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
          label="Password"
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
            offset: 14,
            span: 14,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: '10px' }}
          >
            Login
          </Button>
          <Button htmlType="submit" onClick={() => navigate('/signup')}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
