import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Not Authenticated!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    //Attach userId to request from payload to check is owner of the post
    req.userId = payload.id;

    next();
  });
};
