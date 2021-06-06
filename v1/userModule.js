const postFactory = require('./factory/postFactory');
const getFactory = require('./factory/getFactory');
const putFactory = require('./factory/putFactory');
const deleteFactory = require('./factory/deleteFactory');
const Helpers = require('../helpers/helper');
const async = require("async");
module.exports = {

    _createUser: function(req, callback){
        
        let firstname = req.body.first_name;
        let lastname = req.body.last_name;
        let email = req.body.email;
        let password = req.body.password;
        let phonenumber = req.body.phone_number;
        let gender = req.body.gender;

        if(!firstname){
            callback(Helpers._sendErrorMessage("Invalid FirstName"));
        }else if(!lastname){
            callback(Helpers._sendErrorMessage("Invalid LastName"));
        }else if(!email){
            callback(Helpers._sendErrorMessage("Invalid Email"));
        }else if(!password){
            callback(Helpers._sendErrorMessage("Invalid Password"));
        }else if(!phonenumber){
            callback(Helpers._sendErrorMessage("Invalid PhoneNumber"));
        }else if(!gender){
            callback(Helpers._sendErrorMessage("Invalid Gender"));
        }else{

            //check its valid email
            let emailvalid = Helpers._isValidEmail(email);
            if(!emailvalid){
                callback(Helpers._sendErrorMessage("Invalid Email"));
            }else{

                //using async water fall model for one by one execution
                async.waterfall([
                    function(callback){ //check email is already exist
                        getFactory._checkEmailExist(email, function(emailExist){                            
                            console.log(emailExist);
                            callback(null, emailExist);                         
                        });
                    },
                    function(emailExist, callback){                        
                        if(Object.keys(emailExist).length > 0){                            
                            callback(Helpers._sendErrorwith200("Email Already Exist"),{});                           
                        }else{
                            // insert new record here                            
                            let userData = {
                                first_name: firstname,
                                last_name: lastname,
                                email: email,
                                password: Buffer.from(password, "utf8").toString("base64"),
                                phonenumber: phonenumber,
                                gender: gender,
                                created_at: new Date().getTime()
                            };
                            postFactory._createUser(userData, function(response){
                                callback(null, Helpers._sendSuccessMessage("user created successfully", response));
                            });
                        }
                    }
                ], function(err, result){
                    if(err){
                        callback(err);
                    }else{
                        callback(result);
                    }                    
                });
            }
        }
    },


    _getUsersList: function(req, callback){
    
        let user_id = req.query.user_id;       
        let pageno = req.query.page_no;        
        let userArray = [];

        if(!pageno)
            pageno = 1;            
        
        if(user_id){ //get only the specific user            
            getFactory._getUserById(user_id, function(response){
                callback(Helpers._sendSuccessMessage("user retrieved successfully", [response]));
            });
        }else{            
            let offset = parseInt(pageno) > 1 ? (parseInt(pageno) - 1) * 10 : 0;
            getFactory._getUsers(offset, function(response){
                response.forEach(document => {
                    let json = document.data();
                    json.user_id = document.id;
                    userArray.push(json);
                });                
                callback(Helpers._sendSuccessMessage("users retrieved successfully", userArray));
            });
        }
    },


    _updateUserAccount: function(req, callback){

        let user_id = req.body.user_id;
        let firstname = req.body.first_name;
        let lastname = req.body.last_name;
        let phonenumber = req.body.phonenumber;

        if(!user_id){
            callback(Helpers._sendErrorMessage("Invalid user id"));
        }else if(!firstname){
            callback(Helpers._sendErrorMessage("Invalid FirstName"));
        }else if(!lastname){
            callback(Helpers._sendErrorMessage("Invalid LastName"));
        }else if(!phonenumber){
            callback(Helpers._sendErrorMessage("Invalid Phone Number"));
        }else{
            async.waterfall([
                function(callback){
                    
                    getFactory._getUserById(user_id, function(response){                        
                        if(response && Object.keys(response).length > 0){
                            callback(null);
                        }else{
                            callback(Helpers._sendErrorwith200("User Not Found"));
                        }                        
                    });                    
                },
                function(callback){
                    let updateData = {
                        first_name: firstname,
                        last_name: lastname,
                        phonenumber: phonenumber
                    }
                    putFactory._updateUserAccount(user_id, updateData, function(response){                        
                        callback(null, response);
                    });
                }
            ], function(err, result){
                if(err){
                    callback(err);
                }else{
                    callback(Helpers._sendSuccessMessage("user updated successfully", [result]));
                }
            });
        }        
    },

    _deleteUserAccount: function(req, callback){

        let user_id = req.query.user_id;
        if(!user_id){
            callback(Helpers._sendErrorMessage("Invalid user id"));
        }else{
            deleteFactory._deleteUserAccount(user_id, function(response){
                callback(Helpers._sendSuccessMessage("user deleted successfully", [response]));
            });
        }
    }
}