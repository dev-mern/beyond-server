let env = {
    mongo_uri:"",
    frontend_uri:"",
    crypto_secret_key:"",
    crypto_secret_iv:"",
    jwt_secret:"",
    jwt_expire:""
}
function env_init() {
    env.frontend_uri =  process.env.FRONTEND_URL;
    env.mongo_uri =  process.env.MONGO_URL;
    env.crypto_secret_key = process.env.CRYPTO_SECRET_KEY;
    env.crypto_secret_iv = process.env.CRYPTO_SECRET_IV;
    env.jwt_secret = process.env.JWT_SECRET;
    env.jwt_expire = process.env.JWT_EXPIRY;
    return env;
}

module.exports = {env_init,env};