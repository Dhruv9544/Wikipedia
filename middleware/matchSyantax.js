module.exports = function (req, res, next) {
    try {

      //match regex for checking bad url is there or not
      const wikipediaRegex = /^https:\/\/en\.wikipedia\.org\/.*/;
  
      if (!wikipediaRegex.test(req.body.url)) {
        res.render("result", {
          error: "Please Write Appropriate URL",
        });
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };