import { useDispatch } from 'react-redux';
import { remove, toggleTodo } from '../store/todoSlice';

export const TodoItem = ({ id, text, completed }) => {
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(remove({ id }));
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleTodo({ id }))}
      />
      <span>{text}</span>
      <span onClick={removeTask} style={{ color: 'red' }}>
        &times;
      </span>
    </li>
  );
};
