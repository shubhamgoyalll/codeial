const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method or say module.exports = xyz
exports.newComment = (comment) => {
    console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
        from : 'goyalshubh50@gmail.com',
        to : comment.user.email,
        subject : "New comment published!",
        html : '<h1>Your Comment is now Published.</h1>'
    },(err, info) => {
        if(err){console.log('Error in sending mail', err);return;}

        console.log('Message sent', info);
        return;
    });
}