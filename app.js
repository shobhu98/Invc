let express = require('express');
let app = express();
app.set('view engine', 'ejs');
let path=require('path');
let nodemailer=require('nodemailer');
// let twilio=require('twilio');

const accountSid = 'AC973e8decd35333060224d07568f3e4e6';
const authToken = 'ce0a17c21503a4e8a2185e6965b00ced';
const client = require('twilio')(accountSid, authToken);

// client.messages
//     .create({
//         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//         from: '+19543728578',
//         to: '+918920862975'
//     })
//     .then(message => console.log(message.sid));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static( 'public'));





let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'anant95sharma@gmail.com',
    pass: 'hello@123'
  }
});







app.get('/',function (req,res,next) {
  res.send('index.html');

});


// let email_host,num_host,name_host;
 global.email_host;
app.get('/welcome',function (req,res,next) {
    email=req.query.email;
    console.log(email);
   nam=req.query.name;
   num=req.query.num;
   email_host=req.query.email_host;
   num_host=req.query.num_host;
   name_host=req.query.name_host;
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
    from: 'anant95sharma@gmail.com',
    to: maillist,
    subject: 'New Visitor Details',
    text:"Email_id: "+ email_str+ "\n Name: "+name_str+"\n Number: "+num_str+"\nIn Time: "+time_in,
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

    client.messages
        .create({
            body: "Email_id: "+ email_str+ "\n Name: "+name_str+"\n Number: "+num_str+"\nIn Time: "+time_in,
            from: '+19543728578',
            to: '+91'+num_host
        })
        .then(message => console.log(message.sid));





    next();

});


app.get('/thankyou',function (req,res,next) {
  // console.log(email_host+num_host);
  let today = new Date();
  time_out = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let mailOptions = {
    from: 'anant95sharma@gmail.com',
    to: email,
    subject: 'Thanks For visiting Mr/Ms '+name_host+" at Inovaccer.",
    text:"Email: "+ email_str+ "\nName: "+name_str+"\nNumber "+num_str+"\nTime In "+time_in+"\nTime Out "+time_out,
  };
         console.log(num);
         console.log(typeof (num));
    client.messages
        .create({
            body: 'Thanks For visiting Mr/Ms '+name_host+" at Inovaccer.\n"+"Email: "+ email_str+ "\nName: "+name_str+"\nNumber "+num_str+"\nTime In "+time_in+"\nTime Out "+time_out,
            from: '+19543728578',
            to: '+91'+num
        })
        .then(message => console.log(message.sid));


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
