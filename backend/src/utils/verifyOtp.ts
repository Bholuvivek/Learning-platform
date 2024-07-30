import { User } from '../models/User'; // Import User model

export const verifyOtp = async (email: string, mobile: string, otp: string): Promise<boolean> => {
  const user = await User.findOne({ $or: [{ email }, { mobile }] });

  if (!user || user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
    return false;
  }

  // Clear OTP and expiration time once verified
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return true;
};
