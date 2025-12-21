import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user:process.env.EMAIL_ID,
    pass:process.env.EMAIL_PASSWORD,
  },
});

const SendMail = async(to,otp)=>{
await transporter.sendMail({
    from:process.env.EMAIL_ID,
    to:to,
    subject: "Reset Your Password",
    html: `<p>Your Otp is for Reset Password is <b>${otp}<b/> <p/>. It expires in 5 minutes`
  });
}

export default SendMail;