const express = require("express");
const CheckUrlRoute = require("./routes/CheckUrlRoute");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", CheckUrlRoute);

//route for open index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views" + "/index.html");
});

app.listen(3000);
console.log("server started at 3000");
