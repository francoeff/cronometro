import React from 'react';
import './Button.scss';

const Button = ({ text, onClick, btnClass }) => {
    return (
        <>
            <button className={`btn ${ btnClass }`} onClick={ onClick ?? onClick }>{ text }</button>
        </>
    );
};

export default Button;