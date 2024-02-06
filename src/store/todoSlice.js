import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().toISOString(),
        text: action.payload.text,
        completed: false,
      });
    },
    remove(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    toggleTodo(state, action) {
      const toggled = state.todos.find(todo => todo.id === action.payload.id);
      toggled.completed = !toggled.completed;
    },
  },
});

export const { addTodo, remove, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
