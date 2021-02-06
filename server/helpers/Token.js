const jwt = require("jsonwebtoken");
let secret = Buffer.from(String(process.env.JWT_KEY), "base64");

const CreateToken = (user) => {
  const token = jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "20h",
    algorithm: "HS256",
  });
  return token;
};

const VerifyToken = async (req, res, next) => {
  const AuthHeader = req.headers["authorization"];

  const token = AuthHeader && AuthHeader.split(" ")[1];

  if (!token) return res.status(401).send("cannot access");

  try {
    const result = jwt.verify(token, secret, {
      algorithms: "HS256",
    });
    req.user = result;
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};
module.exports = {
  CreateToken,
  VerifyToken,
};
