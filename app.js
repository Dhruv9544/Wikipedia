const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//function for finding next link from body
async function get_next_link(url) {
  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    // Find the first valid link in the main body text
    const content = $("#mw-content-text");
    const paragraphs = content.find("p");

    let next_link = null;

    // Iterate through paragraphs to find a valid link
    paragraphs.each((index, paragraph) => {
      const links = $(paragraph).find("a");
      if (links.length > 0) {
        next_link = $(links[0]).attr("href");
        return false; // Break out of the loop after finding the first valid link
      }
    });

    return "https://en.wikipedia.org" + next_link;
  } catch (error) {
    console.error("Error in get_next_link:", error.message);
    return null;
  }
}

//function for checking current_url is /wiki/Philosophy
async function get_path_to_philosophy(start_url) {
  const path = [start_url];
  let current_url = start_url;

  console.log("current_url =>", current_url);

  while (current_url !== "https://en.wikipedia.org/wiki/Philosophy") {
    const next_link = await get_next_link(current_url);

    if (!next_link) {
      console.error("No valid link found for:", current_url);
      return null; // No valid link found, break the loop
    }

    // Check if the next link is already in the path
    if (path.includes(next_link)) {
      console.error("Circular reference detected. Breaking the loop.");
      return null;
    }

    path.push(next_link);
    current_url = next_link;
  }

  return path;
}

//route for open index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views" + "/index.html");
});

//route for calculating paths to reach philosophy
app.post("/calculate", async (req, res) => {
  const start_url = req.body.url;
  const path = await get_path_to_philosophy(start_url);

  if (!path) {
    res.render("result", {
      error: "Unable to find a valid path to Philosophy.",
    });
  } else {
    res.render("result", { path });
  }
});

app.listen(3000);
console.log("server started at 3000");
