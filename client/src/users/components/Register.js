import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { addUser } from '../../store/reducers/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users);
  console.log(users);
  const onFinish = (values: any) => {
    console.log('Success:', values);
    dispatch(addUser({ username: values.username, password: values.password }));
    navigate('/');
    alert('register successful');
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
          htmlType="submit"
        >
          Confirm
        </Button>
        <Button htmlType="submit" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}
