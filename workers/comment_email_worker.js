const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

// instead of emails we can give any name of our choice 
queue.process('emails', function(job, done){
    console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data);

    done();
})