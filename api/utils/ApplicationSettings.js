var params = [];

class ApplicationVariable{
    static setApplicationVariables(parameters){
        params = parameters;
    }

    static getApplicationVariables(){
        return params;
    }
    
    static getValue(key){
        var value = ""
        for(var i=0; i< params.length; i++){
            var rec = params[i];            
            if(rec['code'] === key){
                value = rec['value'];
                break;
            }
        }
        return value;
    }
}

module.exports = ApplicationVariable