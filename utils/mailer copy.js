const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : "SendGrid",
    auth : {
        user : process.env.EMAIL,
        pass : process.env.EMAIL_API_KEY
    },
    secure : true
});

console.log( {
    user : process.env.EMAIL,
    pass : process.env.EMAIL_API_KEY
});

const sendEmail = (to, subject, text, html = null, attach = null )=>{
    transporter.sendMail({
        from : process.env.EMAIL,
        to : to,
        subject : subject,
        text : text,
        html : html,
        attachments : attach
    }, (err, info)=>{
        if(err) console.log(err);
        else console.log(info);
    });
}

module.exports = sendEmail