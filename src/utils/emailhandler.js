const axios = require('axios');
const { env } = require("./env_init");

async function sendVerificationCode(emailAddress, verificationCode) {
    const data = {
        service_id: "your_emailjs_service_id",
        template_id: "your_emailjs_template_id",
        user_id: "your_emailjs_user_id",
        template_params: {
            to_email: emailAddress,
            verification_code: verificationCode
        }
    };

    try {
        const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        console.log(emailRes);
        const emailResult = await emailRes.json();
        console.log(emailResult,"emailResult");
        return {status:true,data:emailResult};
    } catch (error) {
        console.log(error);
        return {status:false,error};
    }
    
}


async function sendEmail(email,HTMLtemplate,subject,from_email){
    try {
        // send email
        const emailData = {
            service_id: env.emailjs_service_id,
            template_id: env.emailjs_template_id,
            user_id: env.emailjs_user_id,
            accessToken: env.emailjs_private_key_token,
            template_params: {
                'subject_title': subject,
                "from_email":from_email,
                "to_email":email,
                'to_name': 'Tilok',
                'from_name': 'Shuvo',
                'message': `<div>
                    ${HTMLtemplate}
                </div>`,
            },
        }
        
        const postUrl = 'https://api.emailjs.com/api/v1.0/email/send';
        const {error, data} = await axios.post(postUrl,emailData);
        return data === 'OK' ? true : false;

        
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {sendEmail}