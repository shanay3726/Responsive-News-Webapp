var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

const url = "https://content.guardianapis.com/search?api-key=aa1c5b97-1c7f-4a3f-9f49-559a1bdcfdb2&section=(sport|business|technology|politics)&show-blocks=all";
var json1;
const get_data = async url => {
    try {
      const response = await fetch(url);
      json1 = await response.json();
      console.log("Hello");
    } catch (error) {
      console.log(error);
    }
};
  

router.get('/', function(req, res, next) {
    res.send(json1);
});

module.exports = router;