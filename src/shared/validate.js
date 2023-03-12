import validator from 'validator';

const validate=(value,rule)=>{
    if(rule.required){
        if(value.trim('')==='') return false
    }

    if(rule.isemail){
        if(!validator.isEmail(value))
        return false
    }

    if(value.length < rule.min) return false
    else if(value.length>rule.max) return false

    return true
}

export default validate;
