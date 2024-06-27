import { createTransport } from 'nodemailer';
const sendMail = async (email, subject, text) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: subject,
    text: text,
  };
  await transporter.sendMail(mailOptions);
};
export default sendMail;
