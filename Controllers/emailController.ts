import nodemailer from 'nodemailer'
import asyncHandler from 'express-async-handler';

const sendEmail = async (data: any) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${process.env.USER_EMAIL}`,
            pass: `${process.env.PASS}`
        }
    });

    let send = await transporter.sendMail({
        from: '"Hey" <abc@gmail.com>',
        to: data.to,
        subject: data.subject,
        text: data.text,
        html: data.htm
    })

    console.log("Message sent: %s", send.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(send));
}

export default sendEmail
