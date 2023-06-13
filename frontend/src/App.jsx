import { Routes, Route } from 'react-router-dom';
import { Home, Login, Notfound, Register } from './pages/index.js';
import { Navbar } from './components/index.js';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes.jsx';
import LoggedInRoutes from './routes/LoggedInRoutes.jsx';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from './reducers/userReducer.js';
import styles from './app.module.scss';
import Activate from './pages/home/Activate.jsx';

function App() {
    let user = useSelector(userSelector);
    useEffect(() => {}, [user]);
    return (
        <>
            <div className={styles.main}>
                <div className={styles.main_wrap}>
                    <Navbar />
                </div>
                <div className={styles.main_wrap}>
                    <Routes>
                        <Route path="/activate/:token" element={<Activate />} />
                        <Route element={<LoggedInRoutes />}>
                            <Route path="/" element={<Home />} />
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
