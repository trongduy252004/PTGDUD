import React, { useReducer, useEffect, useRef, useMemo, useState } from 'react';
import './Bai2.css';

// Hàm reducer để xử lý các hành động
const studentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'EDIT':
      return state.map(student =>
        student.id === action.payload.id ? { ...student, ...action.payload } : student
      );
    case 'DELETE':
      return state.filter(student => student.id !== action.payload);
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

const Bai2 = () => {
  const [students, dispatch] = useReducer(studentReducer, []);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [editingId, setEditingId] = useState(null);
  const nameRef = useRef();
  const scoreRef = useRef();

  // Lưu danh sách sinh viên vào localStorage khi danh sách thay đổi
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Lấy danh sách từ localStorage khi ứng dụng khởi động
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    if (storedStudents) {
      dispatch({ type: 'SET', payload: storedStudents });
    }
  }, []);

  // Tính điểm trung bình của sinh viên
  const averageScore = useMemo(() => {
    if (students.length === 0) return 0;
    const total = students.reduce((acc, student) => acc + student.score, 0);
    return (total / students.length).toFixed(2);
  }, [students]);

  const handleAddStudent = () => {
    if (!name || !score) return;
    const newStudent = {
      id: Date.now(),
      name,
      score: parseFloat(score),
    };
    dispatch({ type: 'ADD', payload: newStudent });
    setName('');
    setScore('');
    nameRef.current.focus();
  };

  const handleEditStudent = (student) => {
    setEditingId(student.id);
    setName(student.name);
    setScore(student.score);
  };

  const handleUpdateStudent = () => {
    if (!name || !score || editingId === null) return;
    const updatedStudent = {
      id: editingId,
      name,
      score: parseFloat(score),
    };
    dispatch({ type: 'EDIT', payload: updatedStudent });
    setEditingId(null);
    setName('');
    setScore('');
    nameRef.current.focus();
  };

  const handleDeleteStudent = (id) => {
    dispatch({ type: 'DELETE', payload: id });
  };

  return (
    <div className="container">
      <h1>Quản lý sinh viên</h1>
      <input
        ref={nameRef}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên sinh viên"
      />
      <input
        ref={scoreRef}
        value={score}
        onChange={(e) => setScore(e.target.value)}
        placeholder="Điểm sinh viên"
        type="number"
      />
      {editingId ? (
        <button onClick={handleUpdateStudent}>Sửa điểm</button>
      ) : (
        <button onClick={handleAddStudent}>Thêm sinh viên</button>
      )}
      <h2>Danh sách sinh viên</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} - {student.score}
            <button onClick={() => handleEditStudent(student)}>Sửa</button>
            <button onClick={() => handleDeleteStudent(student.id)}>Xoá</button>
          </li>
        ))}
      </ul>
      <h2>Điểm trung bình: {averageScore}</h2>
    </div>
  );
};

export default Bai2;
