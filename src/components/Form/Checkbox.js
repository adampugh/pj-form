import React from 'react';

const Checkbox = ({name, consent, onChange, message}) => (
    <div className="form-check">
        <input 
            className="form-check-input"
            id={name}
            name={name}
            onChange={onChange}
            value={consent}
            checked={consent}
            type="checkbox" />
        <label htmlFor={name} className="form-check-label">{message}</label>
    </div>
);

export default Checkbox;