const deleteRepo = require('./firestoreRepo/deleteRepo');

module.exports = {
    
    _deleteUserAccount: function(userid, callback){
        deleteRepo._deleteUserAccount(userid, function(response){
            callback(response);
        });
    }
}