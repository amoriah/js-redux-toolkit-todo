import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=15'
      );

      if (!res.ok) throw new Error('Server error!');
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchDelete = createAsyncThunk(
  'todos/fetchDelete',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { method: 'delete' }
      );
      if (!res.ok) throw new Error('Server delete error!');

      dispatch(remove({ id }));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchToggle = createAsyncThunk(
  'todos/fetchToggl',
  async (id, { rejectWithValue, dispatch, getState }) => {
    const todo = getState().todos.todos.find(todo => todo.id === id);
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'put',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ ...todo, completed: !todo.completed }),
        }
      );

      if (!res.ok) throw new Error('Server toggle  error!');
      dispatch(toggleTodo({ id }));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async (text, { rejectWithValue, dispatch }) => {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };
      const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!res.ok) throw new Error('Server error, cannot post todo');
      const data = await res.json();
      dispatch(addTodo(data));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    remove(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    toggleTodo(state, action) {
      const toggled = state.todos.find(todo => todo.id === action.payload.id);
      toggled.completed = !toggled.completed;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.todos = action.payload;
        // state.error = null;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        setError(state, action);
      })
      .addCase(fetchDelete.rejected, (state, action) => {
        setError(state, action);
      })
      .addCase(fetchToggle.rejected, (state, action) => {
        setError(state, action);
      });
  },
});

const { addTodo, remove, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
