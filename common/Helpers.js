'use strict';

const Helpers = {

    convertStringToJson(inputdata){
        try{
            //Already Object
            if(typeof(inputdata) === 'object'){return inputdata;}
    
            //String To JSON
            if((typeof(inputdata) === 'string') && (JSON.parse(inputdata))){return JSON.parse(inputdata);}
    
            //Default False
            return null;
        }
        catch(error){
    
            console.log('JSON::Conversion::error:', error);
            
            return null;
        }
    },
    makeid (length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    },

    urlValidate(value) {
        try {
            new URL(value);
            return true;
        } catch (error) {
            console.log ("error is", error);
           return false; 
        }
        
    }
};

module.exports = Helpers;