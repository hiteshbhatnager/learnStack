import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import Layout from './layout';
import { Dashboard, About, Task, Notes, Lecture } from './pages';
import { StorageService } from './utils/storage';

function App() {
  // Single Source of Truth for Tasks, Notes, and Lectures
  const [tasks, setTasks] = useState(() => StorageService.loadTasks());
  const [notes, setNotes] = useState(() => StorageService.loadNotes());
  const [lectures, setLectures] = useState(() => StorageService.loadLectures());

  // Persist whenever state changes
  useEffect(() => {
    StorageService.saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    StorageService.saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    StorageService.saveLectures(lectures);
  }, [lectures]);

  // Task Actions
  const addTask = ({ title, priority }) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      priority: priority || 'Medium',
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const editTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Note Actions
  const addNote = ({ title, date }) => {
    const newNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      date,
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const editNote = (id, updatedFields) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updatedFields } : n))
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // Lecture Actions
  const addLecture = ({ subject, professor, day, startTime, endTime }) => {
    const newLecture = {
      id: `lec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      subject,
      professor,
      day,
      startTime,
      endTime,
    };
    setLectures((prev) => [...prev, newLecture]);
  };

  const editLecture = (id, updatedFields) => {
    setLectures((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l))
    );
  };

  const deleteLecture = (id) => {
    setLectures((prev) => prev.filter((l) => l.id !== id));
  };

  const appContext = {
    tasks,
    setTasks,
    addTask,
    toggleTask,
    editTask,
    deleteTask,

    notes,
    setNotes,
    addNote,
    editNote,
    deleteNote,

    lectures,
    setLectures,
    addLecture,
    editLecture,
    deleteLecture,
  };

  return (
    <Routes>
      <Route path="/" element={<Layout context={appContext} />}>
        <Route index element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="task" element={<Task />} />
        <Route path="tasks" element={<Task />} />
        <Route path="notes" element={<Notes />} />
        <Route path="lecture" element={<Lecture />} />
        <Route path="lectures" element={<Lecture />} />
      </Route>
    </Routes>
  );
}

export default App;
