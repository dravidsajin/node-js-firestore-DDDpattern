module.exports = {
    _sendErrorMessage: function(errMes){
        
        let json = {
            status: false,
            statusCode: 400,
            message: errMes,
            result: []
        }
        return json;
    },

    _sendErrorwith200: function(errMes){
        
        let json = {
            status: false,
            statusCode: 200,
            message: errMes
        }
        return json;
    },

    _sendSuccessMessage: function(successMes, resonsedata){
        
        let json = {
            status: true,
            statusCode: 200,
            message: successMes,
            result: resonsedata
        }
        return json;
    },

    _isValidEmail: function(email){
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }
}