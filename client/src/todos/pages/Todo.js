import React, { useState } from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import AlertPop from '../../shared/AlertPop';

export default function Todo() {
  const [showSave, setShowSave] = useState(false);
  const showSaveHandler = (status) => {
    setShowSave(status);
  };

  return (
    <>
      {showSave && (
        <AlertPop
          message="Remember to save your changes before leaving"
          type="warning"
          showIcon
          closable
        />
      )}
      <AddTodo onUpdate={showSaveHandler} />
      <TodoList onUpdate={showSaveHandler} showSave={showSave} />
    </>
  );
}
