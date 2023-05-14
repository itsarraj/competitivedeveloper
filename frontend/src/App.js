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
    return (
        <div className="App">
            <h1>Finally Everything is Setup</h1>
            <h1>
                Project Started __ You will see a fun website for developers
                soon
            </h1>
            <h1>frontend {aaaa} </h1> <h1>frontend {aaaa} </h1>{' '}
            <h1>frontend {aaaa} </h1>{' '}
        </div>
    );
}

export default App;
