import React from 'react';

const Button = ({ text, action}) => (
    <div className="form__button">
        <button 
            className="btn btn-primary"
            onClick={action}>
            {text}
        </button>
    </div>
);

export default Button;