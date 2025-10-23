import React, { useState } from 'react';
import api from '../api';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim()) return setError('Title required');
    setLoading(true);
    try {
      await api.post('/tasks/', { title, description });
      setTitle('');
      setDescription('');
      // signal to reload tasks
      window.dispatchEvent(new Event('tasksUpdated'));
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" style={{width:'100%', padding:8}} />
      </div>
      <div style={{marginTop:8}}>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" style={{width:'100%', padding:8}} />
      </div>
      <div style={{marginTop:8}}>
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Task'}</button>
      </div>
      {error && <div style={{color:'red', marginTop:8}}>{error}</div>}
    </form>
  );
}
