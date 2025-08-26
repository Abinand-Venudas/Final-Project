function OTPgenerate(length = 6) {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += char.charAt(Math.floor(Math.random() * char.length));
    }
    return otp;
}
module.exports = OTPgenerate ;
