import React from 'react';
import Cronometro from "./Cronometro";
import './scss/App.scss'

const App = () => {
    return (
        <div className='container'>
            <div className="container__cronometro">
                <Cronometro/>
            </div>
        </div>
    );
};

export default App;