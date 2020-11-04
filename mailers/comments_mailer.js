const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method or say module.exports = xyz
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from : 'goyalshubh50@gmail.com',
        to : comment.user.email,
        subject : "New comment published!",
        // html : '<h1>Your Comment is now Published.</h1>'
        html : htmlString
    },(err, info) => {
        if(err){console.log('Error in sending mail', err);return;}

        console.log('Message sent', info);
        return;
    });
}