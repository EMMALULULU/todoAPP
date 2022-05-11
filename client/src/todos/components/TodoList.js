import React, { useEffect } from 'react';
import { Form, Button, List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTodoList,
  updateTodoListAsync,
} from '../../store/reducers/todoSlice';
import './todoForm.css';
import TodoItem from './TodoItem';
import { SaveOutlined } from '@ant-design/icons';

export default function TodoList(props) {
  const dispatch = useDispatch();
  const initData = useSelector((state) => state.loggedIn);
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    // console.log('get todo list');
    const retrievedTodoList = initData.user.todolist.todoitems;
    // console.log(retrievedTodoList);
    dispatch(getTodoList(retrievedTodoList));
  }, []);

  const SaveTodoListHandler = () => {
    const newDataObject = { ...initData.user, todolist: { todoitems: todos } };
    dispatch(updateTodoListAsync(newDataObject));
    props.onUpdate(false);
  };

  return (
    <div className="todo-form list">
      <List
        size="large"
        header={<h4>Todo List</h4>}
        dataSource={todos}
        renderItem={(item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            name={item.name}
            completed={item.completed}
            onUpdate={props.onUpdate}
          />
        )}
      />
      {props.showSave && (
        <Button
          className="button"
          type="primary"
          shape="round"
          ghost
          icon={<SaveOutlined />}
          onClick={SaveTodoListHandler}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
}
