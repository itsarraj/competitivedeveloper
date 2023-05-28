import { Routes, Route } from 'react-router-dom';

import Login from './pages/login/login.jsx';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
