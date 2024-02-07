import { useDispatch } from 'react-redux';
import { fetchDelete, fetchToggle } from '../store/todoSlice';

export const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(fetchDelete(id));
  };
  // console.log('title', title)
  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(fetchToggle(id))}
      />
      <span>{title}</span>
      <span onClick={removeTask} style={{ color: 'red' }}>
        &times;
      </span>
    </li>
  );
};
