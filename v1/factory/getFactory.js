const getRepo = require('./firestoreRepo/getRepo');

module.exports = {
    
    _checkEmailExist: function(email, callback){
        getRepo._checkEmailExist(email, function(data){
            callback(data);
        });
    },

    _getUserById: function(user_id, callback){
        getRepo._getUserById(user_id, function(data){
            callback(data);
        });
    },

    _getUsers: function(offset, callback){
        getRepo._getUsers(offset, function(data){
            callback(data);
        });
    }
}