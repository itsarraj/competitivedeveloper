import { useState } from 'react';
import styles from './login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import Cookies from 'js-cookie';

const loginInfos = {
    email: '',
    password: '',
};

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, setLogin] = useState(loginInfos);
    const { email, password } = login;
    console.log('login ', login);
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
    };
    const [loading, setLoading] = useState(false);
    const loginSubmit = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/login`,
                {
                    email,
                    password,
                }
            );

            dispatch({ type: 'LOGIN', payload: data });
            Cookies.set('user', JSON.stringify(data));
            navigate('/');
        } catch (error) {}
    };
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <form
                    method="POST"
                    id="form"
                    className={styles.form}
                    onSubmit={(e) => {
                        setLoading(true);
                        e.preventDefault();
                        loginSubmit();
                    }}
                >
                    <h2>Log In</h2>

                    <div className={styles.formControl}>
                        <label htmlFor="email">Email</label>
                        <input
                            typeof="text"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleLoginChange}
                        />
                    </div>

                    <div className={styles.formControl}>
                        <label htmlFor="password">Password</label>
                        <input
                            typeof="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            onChange={handleLoginChange}
                        />
                    </div>

                    <button>Log In</button>

                    <div className={styles.loading}>
                        <BeatLoader
                            color="#3498db"
                            loading={loading}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </form>

                <div className={styles.registerlink}>
                    <Link to="/register">
                        <span className={styles.txt}>
                            Don't have an account? Register
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
