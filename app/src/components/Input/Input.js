import React, {useContext} from 'react';
import {FormContext} from "../../context/FormContext";

function Input({name, code, dataType, required, value}) {
    const {handleChange} = useContext(FormContext);

    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <input
                type={dataType}
                id={name}
                onChange={event => handleChange(code, event)}
                required
                value={value}
            />
        </div>
    );
}

export default Input;
