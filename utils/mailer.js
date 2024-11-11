const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend").MailerSend;
const Sender = require("mailersend").Sender;

const mailersend = new MailerSend({
    apiKey: process.env.MailerSendApiKey,
});

const sentFrom = new Sender(process.env.EMAIL, "Separuh UMRAH");


const sendEmail = async (recipient, subject, text)=>{
    const recipients = [new Recipient(recipient, "Pengguna Baru")];
    
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(subject)
        .setHtml("Pendaftaran Pengguna Baru")
        .setText(text);
    
    await mailersend.email.send(emailParams);
}

module.exports = sendEmail;
