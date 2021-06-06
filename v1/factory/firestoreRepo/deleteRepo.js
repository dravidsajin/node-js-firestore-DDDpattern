const fsConnection = require('./firestoreConnect');

module.exports = {
    _deleteUserAccount: function(userid, callback){
        const userRef = fsConnection.collection('users');
        userRef.doc(userid).delete().then(function(snapshot){
            callback(snapshot);
        });
    }
}