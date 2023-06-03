const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
// nodemailer start
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "hamidalinwl0@gmail.com",
//     pass: "kahjvamcfxyssfcs",
//   },
// });

// const mailOptions = {
//   from: "example@gmail.com",
//   to: "example@example.com",
//   subject: "Nodemailer Test",
//   html: "Test <button>sending</button> Gmail using Node JS",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
//End here

app.post("/", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamidalinwl0@gmail.com",
      pass: "jazrwspmchxrcrvc",
    },
  });
  const mailOptions = {
    from: req.body.email,
    to: "hamidalinwl0@gmail.com",
    subject: `Message from ${req.body.email} : ${req.body.subject}`,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.send("error" + err);
    } else {
      console.log("Email send: " + info.response);
      res.send("success");
    }
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
