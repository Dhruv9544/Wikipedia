const express = require("express");
const CheckUrlRoute = require('./routes/CheckUrlRoute')

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',CheckUrlRoute)





//route for open index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views" + "/index.html");
});

// //route for calculating paths to reach philosophy
// app.post("/calculate", async (req, res) => {
//   const start_url = req.body.url;
//   const path = await get_path_to_philosophy(start_url);

//   if (!path) {
//     res.render("result", {
//       error: "Unable to find a valid path to Philosophy.",
//     });
//   } else {
//     res.render("result", { path });
//   }
// });

app.listen(3000);
console.log("server started at 3000");
