const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 465,
    auth : {
        user : process.env.SMTP_USERNAME,
        pass : process.env.SMTP_PASS
    },
    secure : true
});



const sendEmail = (to, subject, text, html = null, attach = null )=>{
    console.log( {
        user : process.env.SMTP_USERNAME,
        pass : process.env.SMTP_PASS
    });
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