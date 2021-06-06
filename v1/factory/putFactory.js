const putRepo = require('./firestoreRepo/putRepo');

module.exports = {
    
    _updateUserAccount: function(userid, updatedata, callback){
        putRepo._updateUserAccount(userid, updatedata, function(response){
            callback(response);
        });
    }
}