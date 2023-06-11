import { Routes, Route } from 'react-router-dom';
import styles from './module.app.css';
import { Home, Login, Notfound, Register } from './pages/index.js';
function App() {
    return (
        <div className={styles.body}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Notfound />} />
            </Routes>
        </div>
    );
}

export default App;
