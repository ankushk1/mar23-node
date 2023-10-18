const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
require("./config/mongoose");
const userRoutes = require("./routes/userRoutes")

app.use(bodyParser.json());
app.use("/user", userRoutes)

// app.get("/", (req, res) => {
//   console.log("request--", req);
//   res.json({ message: "Nodejs Server Running", age: 30 });
// });

// app.post("/create/:id/:name", (req, res) => {
//   console.log(req.query);
//   console.log(req.params);
//   res.json({});
// });

app.listen(port, () => {
  console.log("Server Running on port: ", port);
});
