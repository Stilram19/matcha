import { randomBytes } from "crypto";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { getVerficationHtml } from "../helpers/constant.js";

dotenv.config();

let transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    secure: false,
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASS
    }
});

// returns the verificationToken
export async function sendEmailVerification(email: string, verificationToken: string) {
    const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${verificationToken}`;

    console.log('sending the email...');
    await transporter.sendMail({
        from: 'Matcha <no-reply@myapp.com>',
        to: email,
        subject: 'Matcha Email Verification',
        html: getVerficationHtml(verificationUrl)
    });
    
    console.log('email sent!');
}
