/*Looping through argument validators and creates error if function validateFieldsValue return false*/
export const validateField = (validators, value, fields) => {
    if(validators && validators.length){
        for (let i = 0; i < validators.length; i++){
            const error = !validateFieldValue(validators[i], value, fields);
            if (error){
                return validators[i].invalid_message;
            }
        }
    }
};

/*Calling this function for each field when we are looping through argument validators in above function*/
/*Getting key and parameters and for each case calling different function*/
const validateFieldValue = (validator, fieldValue, fields) => {
    const parameters = validator.parameters;

    switch (validator.key){
        case "maxLength": return validateMaxLength(fieldValue, parameters.targetLength)
        case "minLength": return validateMinLength(fieldValue, parameters.targetLength)
        case "regex": return validateWithRegex(fieldValue, parameters.regex)
        case "emailValidator": return validateEmail(fieldValue)
        case "olderThan": return validateOlderThan(fieldValue, parameters.age, parameters.inputType)
        case "passwordStrength": return validatePasswordStrength(fieldValue, parameters.regex)
        case "matchesField": return validateMatchesField(fieldValue, parameters.target, fields)

        default: return true;
    }
};

/*Check if value is <= targetLength*/
const validateMaxLength = (value, targetLength) => {
    return value && value.length <= targetLength;
};

/*Check if value is >= targetLength*/
const validateMinLength = (value, targetLength) => {
    return value && value.length >= targetLength;
};

/*Check if value pass regex test*/
const validateWithRegex = (value, regex) => {
    let regexTest = new RegExp(regex);
    return  regexTest.test(value);
};

/*Check if email pass regex test*/
const validateEmail = (value) => {
    let regex = /\S+@\S+\.\S+/;
    return regex.test(value);
};

/*Check if ages are > than minAge*/
const validateOlderThan = (value, minAge, inputType) => {
    if(inputType === 'date'){
        return (getAge(value) > minAge);
    }
    return value && value <= minAge;
};

/*Check if ages are > than minAge*/
const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

/*Check if password pass regex test*/
const validatePasswordStrength = (value, regex) => {
    let regexTest = new RegExp(regex);
    return  regexTest.test(value);
};

/*Check if password is equal with password confirmation value*/
const validateMatchesField = (value, target, fields) => {
    let matchField = fields.find((f) => f.code === target);
    return value && value === matchField['value'];
};

