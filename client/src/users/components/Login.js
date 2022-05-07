import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/loggedInSlice';
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(login({ id: 1, username: values.username }));
    navigate('/todo');
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
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
  );
}
