import { Routes, Route } from 'react-router-dom';
import { Home, Login, Notfound, Register } from './pages/index.js';
import { Navbar } from './components/index.js';
import styles from './app.module.scss';
function App() {
    return (
        <div>
            <Navbar />

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
