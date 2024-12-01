

function includeXXS(input){
    return input.toString().includes("<") || input.toString().includes(">");

}

function validate(data){
    if(Array.isArray(data)){
        let valid = true;
        data.forEach((e)=>{
            if(e==null || e.toString()=="" || includeXXS(e))valid = false;
        });
        return valid;
    }
    if(data==null || data.toString()=="" || includeXXS(data))return false;
    return true;
}


module.exports = validate;