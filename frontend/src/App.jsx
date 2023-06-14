import { Routes, Route } from 'react-router-dom';
import { Home, Login, Notfound, Profile, Register } from './pages/index.js';
import { Navbar } from './components/index.js';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes.jsx';
import LoggedInRoutes from './routes/LoggedInRoutes.jsx';
import styles from './app.module.scss';
import axios from 'axios';
import { userSelector } from './reducers/userReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { postActions } from './reducers/postReducer.js';

function App() {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    if (user && user.token) {
        useEffect(() => {
            getAllPosts();
        }, []);
    }

    const getAllPosts = async () => {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/get-all-posts`,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            dispatch(postActions.setPost(data));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={styles.main}>
                <div className={styles.main_wrap}>
                    <Navbar />
                </div>
                <div className={styles.main_wrap}>
                    <Routes>
                        <Route element={<LoggedInRoutes />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="*" element={<Notfound />} />
                        </Route>
                        <Route element={<NotLoggedInRoutes />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </>
    );
}

export default App;
