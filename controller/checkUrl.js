const checkUrlServices = require('../services/checkUrl')

async function CheckUrl(req,res) {

    const start_url = req.body.url;
    const path = await checkUrlServices.get_path_to_philosophy(start_url);
  
    if (!path) {
      res.render("result", {
        error: "Unable to find a valid path to Philosophy.",
      });
    } else {
      res.render("result", { path });
    }
}

module.exports = {
    CheckUrl
}