import { EmailDateType } from "@/types";
import nodemail from "nodemailer";
const transporter = nodemail.createTransport({
  host: "smtp.gmail.com",
  port: parseInt(process.env.NODEMAILER_PORT!),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.AUTH_USER, // generated ethereal user
    pass: process.env.AUTH_PASS, // generated ethereal password
  },
});

export async function sendMail({ email, title, message }: EmailDateType) {
  const data = {
    from: email,
    to: process.env.AUTH_USER,
    subject: title,
    html: `<h1>${title}</h1>
		<div>${message}</div>
		<br/>
		<p>보낸사람: ${email}</p>
		`,
  };
  return transporter.sendMail(data);
}
