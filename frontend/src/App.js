import './App.css';
import { useEffect, useState } from 'react';

function App() {
    const [aaaa, setaaaa] = useState('aa');
    useEffect(() => {
        getNames();
    }, []);

    const getNames = async () => {
        await fetch('/names').then((res) => {
            setTimeout(() => {
                setaaaa('done');
                console.log(res);
            }, 1000);
        });
    };
    return <div className="App">frontend {aaaa} </div>;
}

export default App;
