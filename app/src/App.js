import {useEffect, useState} from "react";
import formJSON from './sampleData.json';
import {FormContext} from "./context/FormContext";
import Element from "./components/Element/Element";

function App() {
    const [fields, setFields] = useState();
    const [step, setStep] = useState(1);

    /*Set fields from sampleData.json and adds value property to each object*/
    useEffect(() => {
        if (formJSON.fields && formJSON.fields.length > 0) {
            setFields(formJSON.fields.map((field) => {
                return {
                    ...field,
                    value: field.defaultValue
                }
            }));
        }
    }, []);

    /*We go through the fields and take for each field its code and compare it with the code that we passed as id where the function is called, i.e. in the Input component*/
    /*When the condition is met for that field we take the value and set it inside the value*/
    const handleChange = (id, event) => {
        try {
            let changedField = null;
            const newFields = fields.map((field) => {
                const {code} = field;
                if(id === code){
                    field['value'] = event.target.value;
                    changedField = field;
                }
                return field;
            })
            setFields(newFields);
        } catch (error) {
            console.log({error});
        }
    };

    /*Finds which field have step = 1 and doing sort*/
    const getVisibleFields = () => {
        let visibleFields = [];
        visibleFields = fields.filter(field => field.step === step).sort((a, b) => {
            return a.order - b.order;
        });

        return visibleFields;
    }

    return (
        <FormContext.Provider value={{handleChange}}>
            <div className="App">
                {getVisibleFields().map((field, index) => <Element key={index} field={field}/>)}
            </div>
        </FormContext.Provider>
    );
}

export default App;
