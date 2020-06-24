const express=require('express');
const cors = require("cors");
const router=express.Router();
const app=express();

app.use(cors());
const fetch = require('node-fetch');


router.get('/',function(req,res,next) {
    // console.log("DD");
    const url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=k1B6JUoIIdrCeob7pqIjX3FINidY3dUn";
    
    const get_data = async url => {
      try {
        var json1;
        var response;
        var hel1=[];
        var hel2={};
        response = await fetch(url);
        json1 = await response.json();
        // console.log(json1);
        Array.prototype.forEach.call(json1.results,child=>{
          hel2["webTitle"]=child.title;
          hel2["sectionId"]=child.section;
          try{
            if(child.multimedia.length===0)
            {
              hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" 
            
            }
            for(var i=0;i<child.multimedia.length;i++)
            { 
              if(child.multimedia[i].width>=2000)
              {
                hel2["Image"]=child.multimedia[0].url
                break;
              }
              else
              {
                hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" 
              }
            }
          
          }
          catch(err){
            hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
          }
          hel2["date"]=child.published_date;
          hel2["description"]=child.abstract;
          hel2["weburl"]=child.url;
          hel2["id"]=child.url;
          hel2["newsid"]="nytimes";
          let abc=Object.assign({},hel2)
          hel1.push(abc)
          // console.log(hel1);
        })
        json1.results=hel1
        // console.log(hel1)
        res.send(json1.results);
      } catch (error) {
        console.log(error);
      }
  };
  get_data(url);

   
});

router.get('/sectionName',function(req,res,next) {
  // console.log("DD");
  var section=req.query.sec
  var i=0;
  const url = "https://api.nytimes.com/svc/topstories/v2/"+section+".json?api-key=k1B6JUoIIdrCeob7pqIjX3FINidY3dUn";
  const get_data = async url => {
    try {
      var json1;
      var response;
      var hel1=[];
      var hel2={};
      response = await fetch(url);
      json1 = await response.json();
      // console.log("Hello");
      // Array.prototype.forEach.call(json1.results,child=>{
      for(var i=0;i<10;i++)
      {
          hel2["webTitle"]=json1.results[i].title;
          hel2["sectionId"]=json1.results[i].section;
          // console.log(json1.results[i].multimedia)
          try{
            if(json1.results[i].multimedia.length===0)
            {
              hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" 
            }
            for(var j=0;j<json1.results[i].multimedia.length;j++)
            { 
              if(json1.results[i].multimedia[j].width>=2000)
              {
                hel2["Image"]=json1.results[i].multimedia[j].url
                break;
              }
              else
              {
                hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" 
              }
            }
          // hel2["Image"]=json1.results[i].multimedia[0].url
          }
          catch(err){
            hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
          }
          hel2["date"]=json1.results[i].published_date;
          hel2["description"]=json1.results[i].abstract;
          hel2["weburl"]=json1.results[i].url;
          hel2["id"]=json1.results[i].url;
          hel2["newsid"]="nytimes";
          let abc=Object.assign({},hel2)
          hel1.push(abc)
          // console.log(hel1);
          // console.log(i);
      }
      // )
      json1.results=hel1
      //console.log(hel1)
      res.send(json1.results);
    } catch (error) {
      console.log(error);
    }
};
get_data(url);

 
});
router.get('/id',function(req,res,next) {
  // console.log("DD");
  var ids=req.query.id1
  // console.log(ids)
  const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+ids+'")&api-key=k1B6JUoIIdrCeob7pqIjX3FINidY3dUn';
  // console.log(url)
  const get_data = async url => {
    try {
      var json1;
      var response;
      var hel1=[];
      var hel2={};
      response = await fetch(url);
      json1 = await response.json();
      // console.log("JSON FILE");

      // console.log(json1);
      // console.log(json1.response)
        // console.log(json1.response.docs[0].multimedia)
        hel2["webTitle"]=json1.response.docs[0].headline.main;
        hel2["date"]=json1.response.docs[0].pub_date;
        hel2["description"]=json1.response.docs[0].abstract;
        hel2["weburl"]=json1.response.docs[0].web_url;
        
        try{
          console.log(json1.response.docs[0].multimedia)
          if(json1.response.docs[0].multimedia.length===0)
          {
            hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" 
            
          }
          for(var k=0;k<json1.response.docs[0].multimedia.length;k++)
            { 
              if(json1.response.docs[0].multimedia[k].width>=2000)
              {
                hel2["Image"]="https://www.nytimes.com/"+json1.response.docs[0].multimedia[k].url
                console.log("hey")
                break;
              }
              else
              {
                hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" 
                console.log("hey1")
              }
            }
        // hel2["Image"]="https://www.nytimes.com/"+json1.response.docs[0].multimedia[0].url
        }
        catch(err){
          hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
          console.log("hello")
        }
        hel2["sectionId"]=json1.response.docs[0].section_name
        hel2["id"]=ids
        hel2["newsid"]="nytimes";
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
  // console.log(ids)
  const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+search+'&api-key=k1B6JUoIIdrCeob7pqIjX3FINidY3dUn';
  // console.log(url)
  const get_data = async url => {
    try {
      var json1;
      var response;
      var hel1=[];
      var hel2={};
      response = await fetch(url);
      json1 = await response.json();
      //console.log(json1.response.docs ); 
      // Array.prototype.forEach.call(json1.response.docs,child=>
        for(var i=0;i<10;i++){
        hel2["webTitle"]=json1.response.docs[i].headline.main;
        hel2["sectionId"]=json1.response.docs[i].section_name;
        try{

          if(json1.response.docs[i].multimedia.length===0)
          {
            hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" 
            
          }
          for(var k=0;k<json1.response.docs[i].multimedia.length;k++)
            { 
              if(json1.response.docs[i].multimedia[k].width>=2000)
              {
                hel2["Image"]="https://www.nytimes.com/"+json1.response.docs[i].multimedia[k].url
                console.log("hey")
                break;
              }
              else
              {
                hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" 
                console.log("hey1")
              }
            }

        // hel2["Image"]="https://www.nytimes.com/"+json1.response.docs[i].multimedia[0].url
        }
        catch(err){
          hel2["Image"]="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
        }
        hel2["date"]=json1.response.docs[i].pub_date;
        hel2["description"]=json1.response.docs[i].abstract;
        hel2["weburl"]=json1.response.docs[i].web_url;
        hel2["id"]=json1.response.docs[i].web_url;
        hel2["newsid"]="nytimes";
        let abc=Object.assign({},hel2)
        hel1.push(abc)
        // console.log(hel1);
      }
      json1.results=hel1
      // console.log(hel1)
      res.send(json1.results);
    } catch (error) {
      console.log(error);
    }
};
get_data(url);

 
});


module.exports = router;