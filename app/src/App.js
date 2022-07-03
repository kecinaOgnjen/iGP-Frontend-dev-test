// import './app.css';
import formJSON from './sampleData.json';
import {useEffect, useState} from "react";
import Element from "./components/Element/Element.js";
import {FormContext} from './context/FormContext';
import ActionButton from './components/ActionButton/ActionButton.js';
import { validateField } from './utilites/Validator.js';

function App() {
    const [fields, setFields] = useState([]);
    const [step, setStep] = useState(1);
    const [maxSteps, setMaxSteps] = useState(1);
    const [validStepFields, setValidStepFields] = useState(false);
    const [validateMessage, setValidateMessage] = useState('')

    /*Set fields from sampleData.json*/
    useEffect(() => {
        if(formJSON.fields && formJSON.fields.length > 0){
            setFields(formJSON.fields.map(field => {
                return {
                    ...field,
                    value: field.defaultValue,
                }
            }));

        }
        calculateMaxStep(formJSON.fields);
    }, []);

    useEffect(() => {
        validateFields(fields.filter(field => field.step === step).sort((a, b) => {
            return a.order - b.order;
        }));
    }, [fields]);

    /*Calculate max step, finding max value from property "step"*/
    const calculateMaxStep = (fields) => {
        if(fields && fields.length > 0){
            let max = 1;
            fields.forEach(field => {
                if(field.step > max){
                    max = field.step;
                }
            });
            setMaxSteps(max);
        }else {
            setMaxSteps(1);
        }
    }

    /*Looping through fields and calling validateField from Validator.js for each field*/
    /*Check if validateField return false and creates error*/
    const validateFields = (fields) => {
        try {
            let valid = true;

            for (let i = 0; i < fields.length; i++) {
                const field = fields[i];
                let errMessage = validateField(field.validators, field['value'], fields)
                if(errMessage != ''){
                    valid = false;
                    let fieldName = field.name;

                    setValidateMessage(' Invalid('+fieldName + ') ' + errMessage)
                    break;
                }
            }
            setValidStepFields(valid);

            if(valid){
                setValidateMessage('');
            }
        } catch (error) {
            console.log({error});
        }

    }

    const handleNextStepClick = () => {
        setStep(step + 1);
        setValidStepFields(false);
    }

    const handleSubmit = () => {
        alert("Success");
    }

    /*Finds which field have step = 1 and doing sort*/
    const getVisibleFields = () => {
        let visibleFields = [];
        visibleFields = fields.filter(field => field.step === step).sort((a, b) => {
            return a.order - b.order;
        });

        return visibleFields;
    }

    /*We go through the fields and take for each field its code and compare it with the code that we passed as id where the function is called, i.e. in the Input component*/
    /*When the condition is met for that field we take the value and set it inside the value*/
    const handleChange = (id, event) => {
        try {
            let changedField = null;
            const newFields = fields.map((field) => {
                const {code} = field
                if(id === code){
                    field['value'] = event.target.value;
                    console.log(field.name);
                    changedField = field;
                }

                return field;
            });
            setFields(newFields);
        } catch (error) {
            console.log({error});
        }

    }

    return (
        <FormContext.Provider value={{handleChange}}>
            <div className="app">
                {getVisibleFields().map((field, index) => <Element key={index} field={field}/>)}
            </div>
            <ActionButton
                isSubmit={maxSteps === step}
                onNextStep={handleNextStepClick}
                onSubmit={handleSubmit}
                isValid={validStepFields}
            />
            <div>
                <span style={{ color: 'red'}}>{validateMessage}</span>
            </div>
        </FormContext.Provider>
    );
}

export default App;
