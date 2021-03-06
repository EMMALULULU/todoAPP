import React, { useState, useRef, useEffect } from 'react';
import { List, Tag, Button, Input, Checkbox, Popover } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
  toggleComplete,
  deleteTodo,
  editTodo,
} from '../../store/reducers/todoSlice';
import { useDispatch } from 'react-redux';

import './TodoItem.css';
export default function TodoItem(props) {
  const dispatch = useDispatch();

  const [todoItem, setTodoItem] = useState({
    showInput: false,
    todo: props.name,
  });

  const inputEl = useRef();

  const showInputHandler = () => {
    if (!props.completed) {
      setTodoItem((prev) => {
        return { ...prev, showInput: true };
      });
    }
  };
  const closeInputHandler = () => {
    setTodoItem((prev) => {
      return { ...prev, showInput: false };
    });
  };
  const inputHandler = (e) => {
    setTodoItem((prev) => {
      return { ...prev, todo: e.target.value };
    });
  };
  const toggleIsCompletedHandler = () => {
    dispatch(toggleComplete({ id: props.id, completed: !props.completed }));
    props.onUpdate(true);
  };
  const deleteTodoHandler = () => {
    dispatch(deleteTodo({ id: props.id }));
    props.onUpdate(true);
  };

  const updateTodo = () => {
    if (todoItem.todo.length > 0) {
      dispatch(editTodo({ id: props.id, name: todoItem.todo }));
      closeInputHandler();
    }
    props.onUpdate(true);
  };
  return (
    <List.Item>
      <div className="todo-check">
        <Checkbox
          onClick={toggleIsCompletedHandler}
          disabled={todoItem.showInput}
          checked={props.completed}
        />
        {!todoItem.showInput && (
          <Tag
            onClick={showInputHandler}
            color={`${props.completed ? 'gold' : 'cyan'}`}
            className="todo-tag site-tag-plus"
            style={props.completed && { textDecoration: 'line-through' }}
          >
            {props.name}
          </Tag>
        )}
        {todoItem.showInput && (
          <>
            <Input
              ref={inputEl}
              type="text"
              size="small"
              style={{ width: 178 }}
              value={todoItem.todo}
              onChange={inputHandler}
              onBlur={updateTodo}
              onPressEnter={updateTodo}
            />
            <Popover content="Content can not be empty" trigger="click">
              <CheckCircleOutlined
                className="checkCircle"
                style={{ marginLeft: '4px', color: 'red' }}
                onClick={updateTodo}
              />
            </Popover>
          </>
        )}
      </div>

      <Button className="remove-todo-button" danger onClick={deleteTodoHandler}>
        Remove
      </Button>
    </List.Item>
  );
}
