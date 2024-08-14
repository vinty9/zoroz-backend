import dotenv from 'dotenv';

dotenv.config();

export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  fromPhone: process.env.TWILIO_PHONE_NUMBER,
};