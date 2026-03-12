// src/components/TaskCard.jsx
function TaskCard({ task, onEdit, onDelete }) {
    const statusColors = {
        pending: '#f59e0b',
        in_progress: '#3b82f6',
        done: '#10b981',
    };

    return (
        <div style={styles.card}>
            <div style={styles.top}>
                <h3 style={styles.title}>{task.title}</h3>
                <span style={{
                    ...styles.badge,
                    background: statusColors[task.status] || '#ccc'
                }}>
                    {task.status.replace('_', ' ')}
                </span>
            </div>

            {task.description && (
                <p style={styles.description}>{task.description}</p>
            )}

            <div style={styles.actions}>
                <button onClick={onEdit} style={styles.editBtn}>Edit</button>
                <button onClick={onDelete} style={styles.deleteBtn}>Delete</button>
            </div>
        </div>
    );
}

const styles = {
    card: {
        background: 'white',
        padding: '1.2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },
    title: { fontSize: '1rem', fontWeight: '600' },
    badge: {
        color: 'white',
        padding: '0.2rem 0.6rem',
        borderRadius: '999px',
        fontSize: '0.75rem',
        textTransform: 'capitalize',
    },
    description: { color: '#666', fontSize: '0.9rem', marginBottom: '1rem' },
    actions: { display: 'flex', gap: '0.5rem', marginTop: '0.8rem' },
    editBtn: {
        background: '#e0e7ff',
        color: '#4f46e5',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteBtn: {
        background: '#fee2e2',
        color: '#ef4444',
        border: 'none',
        padding: '0.4rem 0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default TaskCard;