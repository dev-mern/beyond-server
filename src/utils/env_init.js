let env = {
    mongo_uri:"",
    frontend_uri:"",
    frontend_uri_dev:"",
    crypto_secret_key:"",
    crypto_secret_iv:"",
    jwt_secret:"",
    jwt_expire:"",
    emailjs_service_id:"",
    emailjs_template_id:"",
    emailjs_user_id:"",
    emailjs_private_key_token:"",
}
function env_init() {
    env.frontend_uri =  process.env.FRONTEND_URL;
    env.frontend_uri_dev =  process.env.FRONTEND_URL_DEV;
    env.mongo_uri =  process.env.MONGO_URL;
    env.crypto_secret_key = process.env.CRYPTO_SECRET_KEY;
    env.crypto_secret_iv = process.env.CRYPTO_SECRET_IV;
    env.jwt_secret = process.env.JWT_SECRET;
    env.jwt_expire = process.env.JWT_EXPIRY;
    env.emailjs_service_id = process.env.EMAILJS_SERVICE_ID;
    env.emailjs_template_id = process.env.EMAILJS_TEMPLATE_ID;
    env.emailjs_user_id = process.env.EMAILJS_USER_ID;
    env.emailjs_private_key_token = process.env.EMAILJS_PRIVATE_KEY_TOKEN;
    return env;
}

module.exports = {env_init,env};