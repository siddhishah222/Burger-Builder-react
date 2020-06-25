export const checkValidity=(value,rules)=>{
    let isValid=true;

     if(!rules){
        return true;  //for checking validation results if no validation rules is defined ex in dropdown list. 0R TO manage the flow.
    }

    if (rules.required){
        isValid= value.trim() !== '' && isValid;  //value.trim to remve whitespace at begin or end
    }
    
    if (rules.minLength){
        isValid=value.length>=rules.minLength && isValid;
    }

    if (rules.maxLength){
        isValid=value.length<=rules.maxLength && isValid;
    }
    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }


    return isValid;
}

//in Auth.js container and contactData.js container we are using checkValidity, so now we export it in here and then import it in each files to make simple code.
//and replace in both files from tis.checkValidity TO chekValidity.