import * as nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    porta: 587,
    secure: true,
    auth: {
        user: "fapsoftexprojetohelpdesk@gmail.com",
        pass: "spis kzmj okuw hohr"
    }
});