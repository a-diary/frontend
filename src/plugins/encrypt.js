import _sha512 from "crypto-js/sha512";
import _md5 from "crypto-js/md5";
import CryptoJS from "crypto-js";

const sha512 = str => _sha512(str).toString();

const md5 = str => _md5(str).toString();

const cbc_encrypt = (content, key, iv = "", hex = false) => {
    content = CryptoJS.enc.Utf8.parse(content);
    key = CryptoJS.enc.Utf8.parse(md5(key));
    iv = CryptoJS.enc.Utf8.parse((iv && md5(iv)) || md5(md5(key)));
    const encrypted = CryptoJS.AES.encrypt(content, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    if (hex) return encrypted.ciphertext.toString();
    else return encrypted.toString();
};

const cbc_decrypt = (encrypted, key, iv = "", hex = false) => {
    if (hex)
        encrypted = CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Hex.parse(encrypted)
        );
    key = CryptoJS.enc.Utf8.parse(md5(key));
    iv = CryptoJS.enc.Utf8.parse((iv && md5(iv)) || md5(md5(key)));
    const content = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
    return content;
};

export default {
    sha512,
    md5,
    cbc_encrypt,
    cbc_decrypt,
};
