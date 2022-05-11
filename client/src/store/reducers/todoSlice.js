import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateTodoListAsync = createAsyncThunk(
  'todos/updateTodoListAsync',
  async (payload) => {
    try {
      const response = await axios.post(
        'http://faas.todolist.hkust.com/function/update-todolist',
        payload
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    getTodoList: (state, action) => {
      const newTodoList = action.payload;
      return newTodoList;
    },
    addTodo: (state, action) => {
      const newTodo = {
        id: Math.random(),
        name: action.payload.name,
        completed: false,
      };
      state.push(newTodo);
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    editTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].name = action.payload.name;
    },
  },
  extraReducers: {
    [updateTodoListAsync.fulfilled]: (state, action) => {},
  },
});
export const { addTodo, toggleComplete, deleteTodo, editTodo, getTodoList } =
  todoSlice.actions;
export default todoSlice.reducer;
