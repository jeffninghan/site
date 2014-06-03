var mongoose = require('mongoose');
var schema = new mongoose.Schema({ username: String, password: String, email: String});
var User = mongoose.model('User', schema);
var nodemailer = require('nodemailer');
var pass = require('../pass');

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "jeffalisonblog@gmail.com",
        pass: pass.email
    }
});

exports.signup = function(creds, cbk) {
	var user = new User( {username: creds.username, password: creds.password, email: creds.email, joined: Date.now()});
	user.save()
	return cbk()
}

exports.auth = function(creds, cbk) {
	User.find({username: creds.username}, function(err, user) {
		if (user[0].password === creds.password) {
			cbk(true)
		}
		else {
			cbk(false)
		}
	})
}

exports.forgot = function(creds, cbk) {
	User.find({email: creds.email}, function(err, user) {
		var mailOptions = {
    			from: "jeffalisonblog@gmail.com", // sender address
    			to: creds.email, // list of receivers
    			subject: "Blog Login", // Subject line
   				text: "Hello! Your username is: " + user[0].username + " and password is: " + user[0].password, // plaintext body
			}
		smtpTransport.sendMail(mailOptions, function(error, response){
    		if(error){
        		console.log(error);
    		}else{
       			console.log("Message sent: " + response.message);
    		}			
    		cbk()
		})
	})
}