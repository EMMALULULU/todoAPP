import React from 'react';
import { Form, Button, List } from 'antd';
import { useSelector } from 'react-redux';
import './todoForm.css';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos = useSelector((state) => state.todos);
  console.log(todos);
  const addTodoHandler = () => {};
  return (
    <div className="todo-form list">
      <List
        size="large"
        header={<h4>Todo List</h4>}
        dataSource={todos}
        renderItem={(item) => (
          <TodoItem
            onAdd={addTodoHandler}
            key={item.id}
            id={item.id}
            content={item.content}
            isCompleted={item.isCompleted}
          />
        )}
      />
    </div>
  );
}
