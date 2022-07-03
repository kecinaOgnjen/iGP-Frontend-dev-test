import React from 'react';
import Input from "../Input/Input";
import Select from "../Select/Select";

function Element({field: {fieldType, name, valueList, value, code, dataType, required}}) {

    switch (fieldType) {
        case 'string':
            return (<Input
                name={name}
                value={value}
                code={code}
                dataType={dataType}
                required={required}
            />)
        case 'dropdown':
            return (<Select
                name={name}
                valueList={valueList}
                code={code}

            />)
        default: return (<Input
            name={name}
            value={value}
            code={code}
            dataType={dataType}
            required={required}
        />)
    }
}

export default Element;
