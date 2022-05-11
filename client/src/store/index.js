import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todoSlice';
// import usersReducer from './reducers/usersSlice';
import loggedInReducer from './reducers/loggedInSlice';
import registerReducer from './reducers/registerSlice';
export default configureStore({
  reducer: {
    todos: todoReducer,
    // users: usersReducer,
    loggedIn: loggedInReducer,
    register: registerReducer,
  },
});
