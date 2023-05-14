import { useEffect, useState } from 'react';

function App() {
    const get = async () => {
        const res = await fetch('http://localhost:8000');
        console.log(res);
    };
    get();

    return (
        <div className="App">
            <h1>Finally Everything is Setup</h1>
            <h1>
                Project Started __ You will see a fun website for developers
                soon
            </h1>
        </div>
    );
}

export default App;
