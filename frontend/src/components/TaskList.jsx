import React, { useEffect, useState } from 'react';
import api from '../api';
import TaskItem from './TaskItem';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/tasks/');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    const onUpdate = () => fetchTasks();
    window.addEventListener('tasksUpdated', onUpdate);
    return () => window.removeEventListener('tasksUpdated', onUpdate);
  }, []);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      {tasks.length === 0 ? <div>No tasks yet</div> : tasks.map(t => (
        <TaskItem key={t.id} task={t} onChange={fetchTasks} />
      ))}
    </div>
  );
}
