const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net', // Host MailerSend
    port: 587, // Atau gunakan port 465 untuk SSL
    secure: false, 
    auth : {
        user : process.env.EMAIL,
        pass : process.env.MailerSendApiKey
    }
});

console.log( {
    user : process.env.EMAIL,
    pass : process.env.MailerSendApiKey
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