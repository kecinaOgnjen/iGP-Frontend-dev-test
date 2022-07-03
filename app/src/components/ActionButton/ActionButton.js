import React from 'react';
import './action-button.css';

function ActionButton({ isSubmit, onNextStep, onSubmit, isValid }) {

    if(isSubmit){
        return (
            <button className='' onClick={onSubmit} disabled={!isValid}>Submit</button>
        )
    }else {
        return (
            <button className='' onClick={onNextStep}  disabled={!isValid}>Next</button>
        )
    }
}

export default ActionButton;
