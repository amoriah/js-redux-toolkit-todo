import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { InputField } from './components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos } from './store/todoSlice';

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { error, status } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const addTask = () => {
    dispatch(addNewTodo(text));
    setText('');
  };

  return (
    <>
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />
      {status === 'loading' && <h1>loading...</h1>}
      {error && <h2>Error: {error.message}</h2>}
      <TodoList />
    </>
  );
}

export default App;
