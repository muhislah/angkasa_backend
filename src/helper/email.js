const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const sendEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "fawwaz.pijarcamp@gmail.com", // generated ethereal user
        pass: "javbyztrzwhtvrjh", // generated ethereal password
      },
    });

    const token = jwt.sign({ email }, "rahasia123", {
      expiresIn: "24h",
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Ankasa" <hasbipijarcamp@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Aktivasi User", // Subject line
      //   text: "Hello world", // plain text body
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      
          <style>
          .container{
            margin-left: auto;
            margin-right: auto;
            width: 300px;
            height: 100px;
            border-radius: 10px;
            background-color: red;
            margin-top: 20px;
            padding-top: 100px;
        }
        .container a{
            text-align: center;
            display: block;
            color: yellow;
            background-color: blue;
            width: 100%;
            padding: 10px 0px 10px;
            text-decoration: none;
        }
          </style>
      </head>
      
      <body>
          <div class="container">  
              <a href="http://localhost:5000/auth/active/${token}">klik aktif</a>
          </div>
      </body>
      </html>`,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail,
};
