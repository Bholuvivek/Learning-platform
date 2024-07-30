import { generateTokens } from './../utils/generateToken';
import { Request, Response } from 'express';
import { User } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendOtp } from '../utils/sendOtp';

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, mobile, password, dob, profilePhoto } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    mobile,
    password: hashedPassword,
    dob,
    profilePhoto,
    otp: undefined, // Set otp and otpExpires if applicable
    otpExpires: undefined
  });

  // Generate and send OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

  user.otp = otp;
  user.otpExpires = otpExpires;

  await user.save();

  sendOtp(user.email, user.mobile);

  res.status(201).json({ message: 'User registered successfully. Please verify OTP.' });
};

export const verifyUser = async (req: Request, res: Response) => {
  const { email, mobile, otp } = req.body;

  const user = await User.findOne({ $or: [{ email }, { mobile }] }).exec();

  if (!user) {
    return res.status(400).json({ message: 'User not found.' });
  }

  if (user.otpExpires && user.otpExpires > new Date() && user.otp === otp) {
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    res.status(200).json({ message: 'User verified successfully.' });
  } else {
    res.status(400).json({ message: 'Invalid or expired OTP.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  const user = await User.findOne({ $or: [{ email: identifier }, { mobile: identifier }] }).populate('roles').exec();

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials.' });
  }

  const { accessToken, refreshToken } = generateTokens(user);

  await new RefreshToken({ token: refreshToken, user: user._id, expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }).save();

  res.status(200).json({ accessToken, refreshToken });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ message: 'Refresh token is required.' });
  }

  const storedToken = await RefreshToken.findOne({ token }).exec();

  if (!storedToken) {
    return res.status(403).json({ message: 'Invalid refresh token.' });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token.' });
    }

    const { accessToken, refreshToken } = generateTokens(decoded);

    storedToken.token = refreshToken;
    storedToken.expiryDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    storedToken.save();

    res.status(200).json({ accessToken, refreshToken });
  });
};
