import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER || "85a1a4001@smtp-brevo.com",
    pass: process.env.SMTP_PASS || "NEavyDUAZbcKrt6k",
  },
});

export default transporter;
