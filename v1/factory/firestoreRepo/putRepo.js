const fsConnection = require('./firestoreConnect');

module.exports = {
    _updateUserAccount: function(userid, updatedata, callback){
        const userRef = fsConnection.collection('users');
        userRef.doc(userid).update(updatedata).then(function(snapshot){
            callback(snapshot);
        });
    }
}