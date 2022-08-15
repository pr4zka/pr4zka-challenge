const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//firmar el token
const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {
      id: user.id,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return sign;
};

//verificar el token
const veryfyToken = async (userToken) => {
  try {
    return jwt.verify(userToken, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  tokenSign,
  veryfyToken,
};
