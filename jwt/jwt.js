const jwt = require("jsonwebtoken");

// Middleware Function
exports.validateToken = async (req, res, next) => {
  try {
    // Access the token
    const token = req.headers.jwt_token;
    // If we don't get the token
    if (!token) {
      return res
        .status(400)
        .json({ message: "Authourization Failed, Token required" });
    }

    // We need to verify the token
    jwt.verify(token, "secretApiKey", function (err, decoded) {
      if (err) {
        return res.status(400).json({ err });
      }

      console.log('Before populating', req.body)
      req.body.userId = decoded._id
      next();
    });

  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
