const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorizations?.split("")[1];
  if (!token) {
    return res.status(401).json({ error: "No Token Provided" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SERCET || "your-secret-key",
    );
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = authMiddleware;
