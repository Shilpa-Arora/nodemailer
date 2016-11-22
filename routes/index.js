var express = require('express');
var nodemailer= require ('nodemailer');
var hashcash = require('nodemailer-hashcash');
var router = express.Router();

var transporter= nodemailer.createTransport('smtps://shilarora10@gmail.com:plumpeach@smtp.gmail.com');
var transporterSup=nodemailer.createTransport('smtps://shilwebsup@gmail.com:plumpeach@smtp.gmail.com');

transporter.use('compile', hashcash());
transporterSup.use('compile', hashcash());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' }); // this goes to index file in views folder and put value of title in html code
  
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'home' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'wish list' });
});
router.get('/contactus', function(req, res, next) {
  res.render('contact', { title: 'Contact us' });
});


// get data from the form submission
router.post("/contactus",function(req,res,next){
	var lastName= req.body.lname;
	var firstName= req.body.fname;
	var emailTo= req.body.email;
	var emailSubject= req.body.subject;
	var emailMessage= req.body.message+" Recieved from Name:"+firstName+" "+ lastName+" with Email Address: "+emailTo;
	
	
	// setup email with data to send from admin account to support account
	var mailOptions = {
    from: 'shilarora10@gmail.com', // admin address
    to: 'shilwebsup@gmail.com', // support address
    subject: emailSubject, // Subject line
    text: emailMessage // plaintext body
   
						};

	// send mail with defined admin transport object
	transporter.sendMail(mailOptions, function(error, info){
    if(error){ 
        return console.log(error);
    }
	else{
							// setup email with data to send from support account to customer account
						var mailOptionsSup = {
						from: 'shilwebsup@gmail.com', // sender address
						to: emailTo, // list of receivers
						subject: 'Message from Shil Inc. Support', // Subject line
						text: 'Hello  '+firstName+','+'\u000d \u000d'+'Thanks for choosing Shil Inc. We will send you complete details shortly.'+'\u000d \u000d'+'Regards,'+'\u000d \u000d'+'Shil Inc.' // plaintext body

						};
						// send mail with defined support transport object
							transporterSup.sendMail(mailOptionsSup, function(error, info){
									if(error){ 
													return console.log(error);
											}
									else
									{
										res.send("Thanks for your message. You will recieve the email from us soon" );
									}		
		
							});
		}
	
			});
	
	
});



module.exports = router;
