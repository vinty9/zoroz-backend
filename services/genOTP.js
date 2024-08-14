export function generateOTP(length) {
  const charset = "0123456789"; // You can add alphabets and special characters if needed
  let OTP = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * charset.length);
    OTP += charset[index];
  }
  return OTP;
}
