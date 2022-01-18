const nodemailer = require('nodemailer');
const defaultMailingList = "example1@vultr.com,example2@vultr.com";
const senderEmail = "sender.example@gmail.com";
const senderPassword = "gmail_app_password"; // gmail app password
module.exports = {
    sendMail: async (subject, text, to = defaultMailingList) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: senderEmail,
                    pass: senderPassword,
                },
            });

            const message = {
                from: `report sender <${senderEmail}>`,
                to,
                subject,
                text: subject,
                html: text,
            };

            transporter.sendMail(message, () => { });
        } catch (e) {
            // handle errors here
        }
    },
};