function includeXXS(input){
    return input.includes("<") || input.includes(">");

}

function validate(data){
    if(data==null || data=="" || includeXXS(data))return false;
    return true;
}

module.exports = validate;