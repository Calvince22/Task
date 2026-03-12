// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await api.post('/auth/login', formData);
            login(res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div style={styles.field}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="john@gmail.com"
                            required
                        />
                    </div>

                    <div style={styles.field}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p style={styles.link}>
                    No account yet? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    card: {
        background: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    title: {
        marginBottom: '1.5rem',
        textAlign: 'center',
    },
    field: {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.4rem',
    },
    input: {
        padding: '0.6rem',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        width: '100%',
        padding: '0.75rem',
        background: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
        marginTop: '0.5rem',
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
        textAlign: 'center',
    },
    link: {
        textAlign: 'center',
        marginTop: '1rem',
    }
};

export default Login;