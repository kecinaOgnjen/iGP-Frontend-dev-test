import React, { useContext } from 'react';
import { FormContext } from '../../context/FormContext';

function Select({name, code, valueList}) {
    const {handleChange} = useContext(FormContext);

    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <select id={name} onChange={event =>{ 
                    handleChange(code, event);
                }}>
                {valueList.map((value, i) =>{
                    return (
                        <option name={value.name} key={i}>{value.value}</option>
                    )
                })}
            </select>
        </div>
    );
}

export default Select;
