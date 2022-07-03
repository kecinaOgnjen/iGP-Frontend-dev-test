import {useEffect, useState} from "react";
import formJSON from './sampleData.json';

function App() {
    const [fields, setFields] = useState();

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

    return (
        <div className="App">
        </div>
    );
}

export default App;
