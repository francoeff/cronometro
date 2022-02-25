import React from 'react';
import './marcador.scss';

const Marcador = ({ time }) => {
    return (
        <div className='marcador'>
            <div className="marcador__tiempo">
                { time }
            </div>
        </div>
    );
};

export default Marcador;