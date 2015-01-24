exports.sendEmail = function (to, title, body) {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'videostatistic@gmail.com',
            pass: 'video000'  //sender credentials
        }
    });
    var mailOptions = {
        from: '<videostatistic@gmail.com>', // sender address
        to: to, // list of receivers
        subject: title, // Subject line
        //text: body // plaintext body
        html: body
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}