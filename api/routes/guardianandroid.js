const express=require('express');
const cors = require("cors");
const router=express.Router();
const app=express();
const googleTrends = require('google-trends-api');

app.use(cors());
const fetch = require('node-fetch');


router.get('/',function(req,res,next) {
    //console.log("DD");
    // const url = "https://content.guardianapis.com/search?api-key=aa1c5b97-1c7f-4a3f-9f49-559a1bdcfdb2&section=(sport|business|technology|politics)&show-blocks=all";
    const url="https://content.guardianapis.com/search?order-by=newest&show-fields=starRating,headline,thumbnail,short-url&api-key=aa1c5b97-1c7f-4a3f-9f49-559a1bdcfdb2";
    const get_data = async url => {
      try {
        var json1;
        var response;
        var hel1=[];
        var hel2={};
        response = await fetch(url);
        json1 = await response.json();
        // console.log("Hello");
        Array.prototype.forEach.call(json1.response.results,child=>{
          hel2["webTitle"]=child.webTitle;
          hel2["sectionId"]=child.sectionName;
          try{
            hel2["Image"]=child.fields.thumbnail;
            }
            catch(err){
              hel2["Image"]="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
            }
          hel2["date"]=child.webPublicationDate;
        //   hel2["description"]=child.blocks.body[0].bodyTextSummary;
          hel2["weburl"]=child.webUrl;
          hel2["id"]=child.id;
          hel2["newsid"]="guardian";
          let abc=Object.assign({},hel2)
          hel1.push(abc)
          // console.log(hel1);
        })
        json1.response.results=hel1
        // console.log(hel1)
        res.send(json1.response.results);
      } catch (error) {
        console.log(error);
      }
  };
  get_data(url);

   
});

router.get('/sectionName',function(req,res,next) {
  // console.log("DD");
  var section=req.query.sec
  const url = "https://content.guardianapis.com/"+section+"?api-key=aa1c5b97-1c7f-4a3f-9f49-559a1bdcfdb2&show-blocks=all";
  
  const get_data = async url => {
    try {
      var json1;
      var response;
      var hel1=[];
      var hel2={};
      
      response = await fetch(url);
      json1 = await response.json();
      // console.log("Hello");
      Array.prototype.forEach.call(json1.response.results,child=>{
        hel2["webTitle"]=child.webTitle;
        hel2["sectionId"]=child.sectionId;
        hel2["date"]=child.webPublicationDate;
        hel2["description"]=child.blocks.body[0].bodyTextSummary;
        hel2["weburl"]=child.webUrl;
        hel2["id"]=child.id;
        try{
        hel2["Image"]=child.blocks.main.elements[0].assets[0].file;
        }
        catch(err){
          hel2["Image"]="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        }
        hel2["newsid"]="guardian";
        let abc=Object.assign({},hel2)
        hel1.push(abc)
        // console.log(hel1);
      })
      json1.response.results=hel1
      // console.log(hel1)
      res.send(json1.response.results);
    } catch (error) {
      console.log(error);
    }
};
get_data(url);

 
});

router.get('/id',function(req,res,next) {
  // console.log("DD");
  var id=req.query.id1
  const url = "https://content.guardianapis.com/"+id+"?api-key=aa1c5b97-1c7f-4a3f-9f49-559a1bdcfdb2&show-blocks=all";
  console.log(url);
  const get_data = async url => {
    try {
      var json1;
      var response;
      var hel1=[];
      var hel2={};
      response = await fetch(url);
      json1 = await response.json();
      // console.log("JSON FILE");

      // console.log(json1.response.content.blocks.body.length);

   
        hel2["webTitle"]=json1.response.content.webTitle;
        hel2["date"]=json1.response.content.webPublicationDate;
        hel2["description"]="";
        for(var i=0;i<json1.response.content.blocks.body.length;i++)
        { 
          if(json1.response.content.blocks.body[i].bodyHtml)
          {hel2["description"]=hel2["description"]+json1.response.content.blocks.body[i].bodyHtml;}
        }
        console.log(hel2["description"]);
        hel2["weburl"]=json1.response.content.webUrl;
        try{
        hel2["Image"]=json1.response.content.blocks.main.elements[0].assets[0].file;
        }
        catch(err){
          hel2["Image"]="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        }
        hel2["sectionId"]=json1.response.content.sectionName;
        hel2["id"]=id;
        hel2["newsid"]="guardian";
        let abc=Object.assign({},hel2)
        hel1.push(abc)
        // console.log(hel1);
      
      json1.response.results=hel1
      // console.log(hel1)
      res.send(json1.response.results);
    } catch (error) {
      console.log(error);
    }
};
get_data(url);

 
});

router.get('/search',function(req,res,next) {
  // console.log("DD");
  var search=req.query.search
  const url = "https://content.guardianapis.com/search?q="+search+"&api-key=aa1c5b97-1c7f-4a3f-9f49-559a1bdcfdb2&show-blocks=all";
  
  const get_data = async url => {
    try {
      var json1;
      var response;
      var hel1=[];
      var hel2={};
      response = await fetch(url);
      json1 = await response.json();
      // console.log(json1); 
      Array.prototype.forEach.call(json1.response.results,child=>{
        hel2["webTitle"]=child.webTitle;
        hel2["sectionId"]=child.sectionId;
        try{
          hel2["Image"]=child.blocks.main.elements[0].assets[0].file;
          }
          catch(err){
            hel2["Image"]="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
          }
        hel2["date"]=child.webPublicationDate;
        hel2["description"]=child.blocks.body[0].bodyTextSummary;
        hel2["weburl"]=child.webUrl;
        hel2["id"]=child.id;
        hel2["newsid"]="guardian";
        let abc=Object.assign({},hel2)
        hel1.push(abc)
        // console.log(hel1);
      })
      json1.response.results=hel1
      //console.log(hel1)
      res.send(json1.response.results);
    } catch (error) {
      console.log(error);
    }
};
get_data(url);

});

router.get('/gettrending',function(req,res,next){
  var word=req.query.gettrending
  googleTrends.interestOverTime({keyword: word, startTime:new Date('2019-06-01'),})
.then(function(results){
  json1=JSON.parse(results);
  console.log(json1);
  var hel1=[];
  var hel2={};
  var i=0;
  for(i=0;i<json1.default.timelineData.length;i++)
  {
    hel1[i]=json1.default.timelineData[i].value[0];
  }
  console.log("hello brother");
  console.log(hel1);
  res.send(hel1);

})
.catch(function(err){
  console.error(err);
});

});


module.exports = router;