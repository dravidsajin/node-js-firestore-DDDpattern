const fsConnection = require('./firestoreConnect');


module.exports = {
    _createUser: function(userData, callback){
        const userRef = fsConnection.collection('users');
        userRef.add(userData).then(function(snapshot){
            callback(snapshot);
        });
    }
}