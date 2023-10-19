const express = require("express");
const { signUp, login } = require("../controller/userController");
const { validateToken } = require("../jwt/jwt");


const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);


router.get("/test", validateToken, (req, res) => {
  console.log('Controller func executed', req.body)
  return res.json({message: "Authourized"})
})
module.exports = router;
