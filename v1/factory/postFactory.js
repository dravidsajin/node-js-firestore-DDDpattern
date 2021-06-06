const postRepo = require('./firestoreRepo/postRepo');

module.exports = {

    _createUser: function(userData, callback){
        
        postRepo._createUser(userData, function(response){
            callback(response);
        });
    }
}