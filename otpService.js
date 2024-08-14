import twilio from 'twilio';
import { twilioConfig } from './config/twilioConfig';

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

export const sendOtpToMobile = async (mobile) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await client.messages.create({
    body: `Your OTP code is ${otp}`,
    from: twilioConfig.fromPhone,
    to: mobile
  });
  // Save OTP to database or in-memory store with an expiry time for verification
  // For example:
  // await saveOtpToDatabase(mobile, otp);
  return otp;
};

export const verifyOtp = async (mobile, otp) => {
  // Verify OTP against the saved value in database or in-memory store
  // For example:
  // const savedOtp = await getOtpFromDatabase(mobile);
  // if (savedOtp === otp) {
  //   // Fetch or create user based on mobile number
  //   const user = await findOrCreateUserByMobile(mobile);
  //   return user;
  // }
  // return null;
  // For this example, we'll assume the OTP is valid and return a dummy user
  const dummyUser = { username: 'User123', mobile };
  return dummyUser;
};
