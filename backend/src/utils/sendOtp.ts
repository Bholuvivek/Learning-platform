import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { User } from '../models/User'; // Import User model

export const sendOtp = async (email: string, mobile: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

  // Save OTP and expiration time to the user's document
  const user = await User.findOne({ $or: [{ email }, { mobile }] });

  if (!user) {
    throw new Error('User not found.');
  }

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  await transporter.sendMail(mailOptions);

  // Send OTP via SMS using Twilio
  const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  await twilioClient.messages.create({
    body: `Your OTP code is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: mobile
  });
};
