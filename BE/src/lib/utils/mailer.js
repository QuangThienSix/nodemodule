import * as nodemailer from "nodemailer";
import appConfig from "../../config/env/app.dev.json";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: appConfig.Mail.Gmail_USER, // generated ethereal user
    pass: appConfig.Mail.Gmail_PASS, // generated ethereal password
  },
});

// Mat Khau : pbwzanxeyonhugbc

export const sendMail = (from, to, subject, html) => {
  return new Promise(function (resolve, reject) {
    transporter.sendMail({ from, to, subject, html }, (err, info) => {
      if (err) reject(err);
      resolve(info);
    });
  });
};
