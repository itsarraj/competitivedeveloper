const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { set } = require('mongoose');
const { OAuth2 } = google.auth;
const oauth_link = 'https://developers.google.com/oauthplayground';
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
    MAILING_ID,
    MAILING_SECRET,
    MAILING_REFRESH,
    oauth_link
);

exports.sendVerificationEmail = async (email, anme, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });

    const accessToken = await auth.getAccessToken();
    const smtp = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken: accessToken,
        },
    });

    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Verify your email',
        html: `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Verify Your Email</title></head><body> <h1 style=" font-size: 24px; font-weight: 600; color: #2a9d8f; margin-bottom: 20px;" >Verify Your Email</h1> <p>Click the link below to verify your email address.</p> <a href=${url} style=" display: inline-block; padding: 10px 20px; background-color: #2a9d8f; color: #fff; text-decoration: none; border-radius: 5px;" >Confirm your account</a> <br/></body></html>`,
    };
    smtp.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            console.log('Email sent: ' + info?.response);
            return info?.response;
        }
    });
};
