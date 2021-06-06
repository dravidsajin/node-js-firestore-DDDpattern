const fsConnection = require('./firestoreConnect');

module.exports = {
    _checkEmailExist: function(email, callback){        
        const userRef = fsConnection.collection('users');
        userRef.where('email','==',email).limit(1).get().then(function(snapshot){
            if(snapshot.empty){
                console.log("======empoty object======");
                callback({});
            }else{
                console.log("======useremailfound=======");
                snapshot.forEach(document => {                    
                    callback(document.data());
                });
            }            
        });
    },

    _getUserById: function(user_id, callback){
        const userRef = fsConnection.collection('users');
        userRef.doc(user_id).get().then(function(snapshot){
            if(snapshot.empty){
                console.log("======empty object======");
                callback({});
            }else{
                console.log("======useremailfound=======");
                callback(snapshot.data());
            }
        });
    },

    _getUsers: function(offset, callback){        
        const userRef = fsConnection.collection('users');
        userRef.orderBy('email').limit(10).offset(offset).get().then(function(snapshot){
            if(snapshot.empty){
                callback([]);
            }else{                
                callback(snapshot);
            }
        });
    }
}