import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.user = decoded.user;
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
  next();
}
