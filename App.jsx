import { Routes, Route } from 'react-router-dom';

import Login from './pages/login/login';

function App() {
    return (
        <div>
            <Routes>
                <Route path="*" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
