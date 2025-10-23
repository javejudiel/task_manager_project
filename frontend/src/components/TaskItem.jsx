import React, { useState } from 'react';
import api from '../api';

export default function TaskItem({ task, onChange }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [loading, setLoading] = useState(false);

  const toggleCompleted = async () => {
    setLoading(true);
    try {
      await api.patch(`/tasks/${task.id}/`, { completed: !task.completed });
      onChange();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const saveEdit = async () => {
    setLoading(true);
    try {
      await api.put(`/tasks/${task.id}/`, { title, description });
      setEditing(false);
      onChange();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  const deleteTask = async () => {
    if (!confirm('Delete this task?')) return;
    setLoading(true);
    try {
      await api.delete(`/tasks/${task.id}/`);
      onChange();
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <div style={{border:'1px solid #ccc', padding:10, marginBottom:8, opacity: loading ? 0.6:1}}>
      {editing ? (
        <>
          <input value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%', padding:6}} />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} style={{width:'100%', padding:6, marginTop:6}} />
          <div style={{marginTop:6}}>
            <button onClick={saveEdit}>Save</button>
            <button onClick={()=>setEditing(false)} style={{marginLeft:6}}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div style={{textDecoration: task.completed ? 'line-through' : 'none'}}>
            <strong>{task.title}</strong>
          </div>
          <div>{task.description}</div>
          <div style={{marginTop:6}}>
            <button onClick={toggleCompleted}>{task.completed ? 'Mark Uncompleted' : 'Mark Completed'}</button>
            <button onClick={()=>setEditing(true)} style={{marginLeft:6}}>Edit</button>
            <button onClick={deleteTask} style={{marginLeft:6}}>Delete</button>
          </div>
          <div style={{fontSize:'0.8em', color:'#666', marginTop:6}}>Created: {new Date(task.created_at).toLocaleString()}</div>
        </>
      )}
    </div>
  );
}
