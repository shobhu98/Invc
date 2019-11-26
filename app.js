let express = require('express');
let app = express();
app.set('view engine', 'ejs');
let path=require('path');
let nodemailer=require('nodemailer');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static( 'public'));

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'shobhit978tiwari@gmail.com',
    pass: 'iama98boy'
  }
});







app.get('/',function (req,res,next) {
  res.send('index.html');

});


// let email_host,num_host,name_host;
 global.email_host;
app.get('/welcome',function (req,res,next) {
    email=req.query.email;
   nam=req.query.name;
   num=req.query.num;
   email_host=req.query.email_host;
 let  num_host=req.query.num_host;
 let  name_host=req.query.name_host;
    // console.log(email);


  let today = new Date();
   time_in = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // console.log(typeof (time_in));



   email_str=email.toString();
   name_str=nam.toString();
   num_str=num.toString();




  // console.log(typeof (email_str));
  res.render('info.ejs',{nam:email_str,email:name_str,num:num_str,check_in:time_in});


let maillist=[email_host];

  let mailOptions = {
    from: 'shobhit978tiwari@gmail.com',
    to: maillist,
    subject: 'Sending Email using Node.js',
    text:"Email: "+ email_str+ " Name:"+name_str+" Number"+num_str+"In Time:"+time_in,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

next();

});


app.get('/thankyou',function (req,res) {
  // console.log(email_host+num_host);
  let today = new Date();
  time_out = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let mailOptions = {
    from: 'shobhit978tiwari@gmail.com',
    to: email,
    subject: 'Sending you mail',
    text:"Email: "+ email_str+ " Name:"+name_str+" Number"+num_str+"Time In"+time_in+"Time Out"+time_out,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  console.log(email_host);
  res.sendFile(path.join(__dirname + '/Thankyou.html'));

});
app.listen(8000,function () {
  console.log("running on 8000");



});

module.exports = app;
