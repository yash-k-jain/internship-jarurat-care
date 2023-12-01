const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/contact", async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "yash.test.project@gmail.com",
      pass: "xhpx jlla xhha vhla",
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${req.body.name}" <yash.test.gmail@gmail.com>`, // sender address
      to: "jainy092005@gmail.com", // list of receivers
      subject: req.body.subject, // Subject line
      html: `<h4>Email: ${req.body.email}</h4><p>Message: ${req.body.message}</p>`, // html body
    //   text: req.body.message, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    res.json(info.messageId)
  }
  main().catch(console.error);
});

module.exports = router;
