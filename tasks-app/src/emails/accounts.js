import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: '911hellocop@gmail.com',
        subject: 'Welcome to Tasks-App',
        text: `Welcome to the app, ${name}. Let us know how you get along with the app.`
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail.send(msg);
}


const sendCancelEmail = (email, name) => {
    const msg = {
        to: email,
        from: '911hellocop@gmail.com',
        subject: 'GoodBye 🥲',
        text: `Thanks for using the app, ${name}. Let us know what made you leave this platform.`
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail.send(msg);
}


export default {
    sendWelcomeEmail,
    sendCancelEmail
};