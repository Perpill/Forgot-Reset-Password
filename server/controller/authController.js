//function for our sign up, login, forget, reset

const User = require("../model/userModel.js");
const catchAsync = require("../utils/catchAsync.js");
const sendEmail = require("../utils/email.js");
const generateOtp = require("../utils/generateOtp.js");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return JsonWebTokenError.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", //only secure in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
  };

  res.cookie("token", token, cookieOptions);

  user.password = undefined;
  user.passwordConfirm = undefined;
  user.otp = undefined;

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, username } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) return next(new AppError("Email Already registered", 400));

  const otp = generateOtp();

  const otpExpires = Date.now() * 24 * 60 * 60 * 1000;

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    otp,
    optExpires,
  });

  try {
    await sendEmail({
      email: newUser,
      subject: "OTP for email verifications",
      html: `<h1>Your OTP is: ${otp}</h1>`,
    });

    createSendToken(newUser, 200, res, "Registration sucessful");
  } catch (error) {
    await user.findByIdAndDelete(newUser.id);
    return next(
      new AppError("There is an error sending the email. Try again", 500)
    );
  }
});
