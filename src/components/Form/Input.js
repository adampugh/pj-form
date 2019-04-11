import React from 'react';

const Input = (props) => (
    <div className="form-group">
        <label htmlFor={props.name}>{props.title}</label>
        <input className="form-control" id={props.name} {...props} />
    </div>
);

export default Input;