import { Request, Response } from 'express';
import { User } from '../models/User';
import { verifyOtp } from '../utils/verifyOtp';
import { cloudinary } from '../utils/cloudnary';

export const updateUserProfile = async (req: Request, res: Response) => {
  const { firstName, lastName, email, mobile, dob, profilePhoto, otp } = req.body;

  // Type check for req.user
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }

  if (!verifyOtp(email, mobile, otp)) {
    return res.status(400).json({ message: 'Invalid OTP.' });
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.mobile = mobile || user.mobile;
  user.dob = dob || user.dob;

  if (profilePhoto) {
    try {
      const uploadResponse = await cloudinary.v2.uploader.upload(profilePhoto, {
        upload_preset: 'your_upload_preset'
      });
      user.profilePhoto = uploadResponse.secure_url;
    } catch (error) {
      return res.status(500).json({ message: 'Failed to upload image.' });
    }
  }

  await user.save();

  res.status(200).json({ message: 'Profile updated successfully.', user });
};
