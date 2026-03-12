// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import TaskCard from '../components/TaskCard';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [editTask, setEditTask] = useState(null);

    const { logout } = useAuth();
    const navigate = useNavigate();

    // fetch tasks when page loads
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/tasks', newTask);
            setTasks([...tasks, res.data]);  // add new task to list
            setNewTask({ title: '', description: '' });
            setShowForm(false);
        } catch (err) {
            setError('Failed to create task');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/tasks/${editTask.id}`, editTask);
            setTasks(tasks.map(t => t.id === editTask.id ? res.data : t));
            setEditTask(null);
        } catch (err) {
            setError('Failed to update task');
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t.id !== id)); // remove from list
        } catch (err) {
            setError('Failed to delete task');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <p style={styles.center}>Loading tasks...</p>;

    return (
        <div style={styles.container}>

            {/* Navbar */}
            <div style={styles.navbar}>
                <h2>My Tasks</h2>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    Logout
                </button>
            </div>

            <div style={styles.content}>
                {error && <p style={styles.error}>{error}</p>}

                {/* Create Task Button */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    style={styles.createBtn}
                >
                    {showForm ? 'Cancel' : '+ New Task'}
                </button>

                {/* Create Task Form */}
                {showForm && (
                    <form onSubmit={handleCreate} style={styles.form}>
                        <input
                            type="text"
                            placeholder="Task title"
                            value={newTask.title}
                            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                            style={styles.input}
                            required
                        />
                        <textarea
                            placeholder="Description (optional)"
                            value={newTask.description}
                            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                            style={styles.textarea}
                        />
                        <button type="submit" style={styles.submitBtn}>
                            Create Task
                        </button>
                    </form>
                )}

                {/* Edit Task Form */}
                {editTask && (
                    <form onSubmit={handleUpdate} style={styles.form}>
                        <h3>Edit Task</h3>
                        <input
                            type="text"
                            value={editTask.title}
                            onChange={e => setEditTask({ ...editTask, title: e.target.value })}
                            style={styles.input}
                            required
                        />
                        <textarea
                            value={editTask.description}
                            onChange={e => setEditTask({ ...editTask, description: e.target.value })}
                            style={styles.textarea}
                        />
                        <select
                            value={editTask.status}
                            onChange={e => setEditTask({ ...editTask, status: e.target.value })}
                            style={styles.input}
                        >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <div style={styles.row}>
                            <button type="submit" style={styles.submitBtn}>
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditTask(null)}
                                style={styles.cancelBtn}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* Task List */}
                {tasks.length === 0 ? (
                    <p style={styles.center}>No tasks yet. Create one above.</p>
                ) : (
                    <div style={styles.taskList}>
                        {tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={() => setEditTask(task)}
                                onDelete={() => handleDelete(task.id)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: { minHeight: '100vh', background: '#f0f2f5' },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    content: { maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' },
    error: { color: 'red', marginBottom: '1rem' },
    center: { textAlign: 'center', marginTop: '2rem', color: '#666' },
    createBtn: {
        background: '#4f46e5',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1.2rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '1rem',
        fontSize: '1rem',
    },
    form: {
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    input: {
        padding: '0.6rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    textarea: {
        padding: '0.6rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        minHeight: '80px',
        resize: 'vertical',
    },
    submitBtn: {
        background: '#4f46e5',
        color: 'white',
        border: 'none',
        padding: '0.6rem 1.2rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    cancelBtn: {
        background: '#e5e7eb',
        color: '#333',
        border: 'none',
        padding: '0.6rem 1.2rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    row: { display: 'flex', gap: '0.8rem' },
    logoutBtn: {
        background: 'transparent',
        border: '1px solid #ccc',
        padding: '0.4rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    taskList: { display: 'flex', flexDirection: 'column', gap: '1rem' },
};

export default Dashboard;