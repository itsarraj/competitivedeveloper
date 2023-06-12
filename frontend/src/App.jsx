import { Routes, Route } from 'react-router-dom';
import { Home, Login, Notfound, Register } from './pages/index.js';
import { Navbar } from './components/index.js';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes.jsx';
import LoggedInRoutes from './routes/LoggedInRoutes.jsx';
// import styles from './app.module.scss';
function App() {
    return (
        <div>
            <Navbar />

            <Routes>
                {/* <Route element={<LoggedInRoutes />}> */}
                <Route path="/" element={<Home />} />
                {/* </Route> */}
                {/* <Route element={<NotLoggedInRoutes />}> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Notfound />} />
                {/* </Route> */}
            </Routes>
        </div>
    );
}

export default App;
