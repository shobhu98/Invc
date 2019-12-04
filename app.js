let express = require('express');
let app = express();
app.set('view engine', 'ejs');
let path=require('path');
let nodemailer=require('nodemailer');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static( 'public'));

const accountSid = 'ACcb5e785191c3241e9e8e55df6d4a897e';
const authToken = '5e775cf6de4d91a11dadb1c526e283fa';
const client = require('twilio')(accountSid, authToken);




const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '606d23b2',
    apiSecret: 'IHbO2p6vlY2hBjb8',

});
// nexmo.message.sendSms('NEXMO','+918920862975', "hello everyone",function (err,data) {
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log(data);
//     }
//
// });




client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from:'+19543728578',
        to: '+918920862975',
    })
    .then(message => console.log(message.sid));







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

    // client.messages
    //     .create({
    //         body: "Email_id: "+ email_str+ "\n Name: "+name_str+"\n Number: "+num_str+"\nIn Time: "+time_in,
    //         from: '+19546271845',
    //         to: '+91'+num_host
    //     })
    //     .then(message => console.log(message.sid));


    nexmo.message.sendSms('NEXMO','+91'+num_host, "Email_id: "+ email_str+ "\n Name: "+name_str+"\n Number: "+num_str+"\nIn Time: "+time_in,function (err,data) {
        if(err){
            console.log(err)
        }
        else {
            console.log(data);
        }

    });





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
    // client.messages
    //     .create({
    //         body: 'Thanks For visiting Mr/Ms '+name_host+" at Inovaccer.\n"+"Email: "+ email_str+ "\nName: "+name_str+"\nNumber "+num_str+"\nTime In "+time_in+"\nTime Out "+time_out,
    //         from: '+19546271845',
    //         to: '+91'+num
    //     })
    //     .then(message => console.log(message.sid));


    nexmo.message.sendSms('NEXMO','+91'+num,'Thanks For visiting Mr/Ms '+name_host+" at Inovaccer.\n"+"Email: "+ email_str+ "\nName: "+name_str+"\nNumber "+num_str+"\nTime In "+time_in+"\nTime Out "+time_out,function (err,data) {
        if(err){
            console.log(err)
        }
        else {
            console.log(data);
        }

    });




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
