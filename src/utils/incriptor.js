const crypto = require('crypto');
const { env } = require('./env_init');

function encryptCryptoString(plainText) {
    const crypto_algorithm = "AES-256-CBC";
    // generate crypto key and crypto iv secret
    const generatedKey = crypto.createHash('sha512').update(env.crypto_secret_key,'utf-8').digest("hex").substr(0,32);
    const generatedIV = crypto.createHash('sha512').update(env.crypto_secret_iv,'utf-8').digest("hex").substr(0,16);

    // encrypt the plain text
    const encryptor = crypto.createCipheriv(crypto_algorithm,generatedKey,generatedIV);
    const finalEncrypted = encryptor.update(plainText,"utf-8","base64") + encryptor.final('base64');
    return Buffer.from(finalEncrypted).toString("base64");
}

function decryptCryptoString(encryptedText) {
    const crypto_algorithm = "AES-256-CBC";
    // generate crypto key and crypto iv secret
    const generatedKey = crypto.createHash('sha512').update(env.crypto_secret_key,'utf-8').digest("hex").substr(0,32);
    const generatedIV = crypto.createHash('sha512').update(env.crypto_secret_iv,'utf-8').digest("hex").substr(0,16);

    // encrypt the plain text
    const encryptedBuffer = Buffer.from(encryptedText,"base64")
    encryptedText = encryptedBuffer.toString("utf-8");

    const decryptor = crypto.createDecipheriv(crypto_algorithm,generatedKey,generatedIV);
    return decryptor.update(encryptedText,"base64","utf8") + decryptor.final('utf8');
}

module.exports = {
    encryptCryptoString,
    decryptCryptoString,
}