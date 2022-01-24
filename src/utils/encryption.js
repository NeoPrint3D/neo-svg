import cryptoJs from "crypto-js";

function decrypt(data, key) {
    return cryptoJs.AES.decrypt(data, key).toString(cryptoJs.enc.Utf8);
}
function encrypt(data, key) {
    return cryptoJs.AES.encrypt(data, key).toString();
}
export {
    decrypt,
    encrypt
}