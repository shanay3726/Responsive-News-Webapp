const express=require('express');
const cors = require("cors");
const router=express.Router();
const app=express();

app.use(cors());
const fetch = require('node-fetch');
var hel1=[];
var hel2={};
const url= "https://content.guardianapis.com/world?api-key=aa1c5b97-1c7f-4a3f-9f49-559a1bdcfdb2&show-blocks=all"
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
get_data(url);
router.get('/',function(req,res,next) {
    console.log("DD");
    Array.prototype.forEach.call(json1.response.results,child=>{
      hel2["webTitle"]=child.webTitle;
      hel2["sectionId"]=child.sectionId;
      hel2["Image"]=(child.blocks.main.elements[0].assets[0])?child.blocks.main.elements[0].assets[child.blocks.main.elements[0].assets.length-1].file : "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      hel2["date"]=child.webPublicationDate;
      hel2["description"]=child.blocks.body[0].bodyTextSummary;
      hel2["weburl"]=child.webUrl;
      let abc=Object.assign({},hel2)
      hel1.push(abc)
      console.log(hel1);
    })
    json1.response.results=hel1
    console.log(hel1)
    res.send(json1.response.results);
});

module.exports = router;