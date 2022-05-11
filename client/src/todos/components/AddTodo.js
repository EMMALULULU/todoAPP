import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/reducers/todoSlice';
import { Form, Row, Col, Button, Input } from 'antd';
import './todoForm.css';

export default function AddTodo(props) {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch();

  const newTodoHandle = (e) => {
    setTodo(e.target.value);
  };
  const addTodoHandler = () => {
    console.log(todo);
    dispatch(addTodo({ name: todo }));
    setTodo('');
    props.onUpdate(true);
  };
  return (
    <div className="todo-form">
      <Form layout="horizontal">
        Add New Todo
        <Row>
          <Col xs={24} sm={24} md={17} lg={19} xl={20}>
            <Form.Item>
              <Input
                placeholder="What needs to be done?"
                onChange={newTodoHandle}
                value={todo}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={7} lg={5} xl={4}>
            <Button
              type="primary"
              htmlType="submit"
              block
              onClick={addTodoHandler}
            >
              Add todo
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
