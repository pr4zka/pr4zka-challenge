const { comparePassword, encrypt } = require("../helpers/handlePass");
const users = require("../models/users");
const { tokenSign } = require("../helpers/handleJwt");
const sgMail = require("@sendgrid/mail");

class authControlllers {
  static async login(req, res) {
    try {
      const { password } = req.body;
      const { email } = req.body;
      const user = await users.findOne({ where: { email } });
      if (!user) {
        res.send({ msg: "User not found" });
        return;
      }
      //compara la contraseña del usuario con la contraseña que se recibe
      const isMactch = await comparePassword(password, user.password);
      if (!isMactch) {
        res.send({ msg: "Password incorrect" });
        return;
      }
      const data = {
        token: await tokenSign(user),
        user,
      };
      user.set({ password: undefined });
      res.send({ msg: "Login successful", data });
    } catch (error) {
      res.send({ smg: "Error in login" });
    }
  }

  static async register(req, res) {
    const password = await encrypt(req.body.password);
    const { email } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${email}`, // Change to your recipient
      from: "ivanhakate2018@icloud.com", // Change to your verified sender
      subject: "API DISNEY",
      text: `Bienvenido su cuenta ah sido creada correctamente, DISFRUTE EL SERVICIO!!`,
      html: "<strong>Bienvenido a la API de ALKEMY. DISFRUTE EL SERVICIO!</strong>",
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    const userData = await users.create({ password, email });
    //elimina el password de la respuesta
    userData.set({ password: undefined });

    //firmar el token
    const data = {
      token: await tokenSign(userData),
      user: userData,
    };
    res.send({ msg: "User created successfully verify your email", userData });
  }
}

module.exports = authControlllers;
