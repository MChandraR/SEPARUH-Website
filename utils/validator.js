

function includeXXS(input){
    return input.toString().includes("<") || input.toString().includes(">");

}

function validate(data){
    if(data==null || data.toString()=="" || includeXXS(data))return false;
    return true;
}

module.exports = validate;