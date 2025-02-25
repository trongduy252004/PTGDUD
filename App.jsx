import React, { useReducer, useEffect, useRef, useMemo, useState } from 'react';
import './App.css';

// Hàm reducer để xử lý các hành động
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'DELETE':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();

  // Lưu danh sách công việc vào localStorage khi danh sách thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Lấy danh sách từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      dispatch({ type: 'SET', payload: storedTodos });
    }
  }, []);

  // Sử dụng useMemo để lọc các công việc đã hoàn thành và chưa hoàn thành
  const filteredTodos = useMemo(() => {
    return {
      incomplete: todos.filter(todo => !todo.completed),
      completed: todos.filter(todo => todo.completed),
    };
  }, [todos]);

  const handleAddTodo = () => {
    if (!inputValue) return;
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    dispatch({ type: 'ADD', payload: newTodo });
    setInputValue('');
    inputRef.current.focus();
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: 'TOGGLE', payload: id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Thêm công việc mới"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <h2>Công việc chưa hoàn thành</h2>
      <ul>
        {filteredTodos.incomplete.map(todo => (
          <li key={todo.id} onClick={() => handleToggleTodo(todo.id)}>
            {todo.text}
          </li>
        ))}
      </ul>
      <h2>Công việc đã hoàn thành</h2>
      <ul>
        {filteredTodos.completed.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
