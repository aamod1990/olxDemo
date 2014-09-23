var path = require('path');
var xlsx = require('node-xlsx');
var http = require('http-get');
var fs = require('fs');
module.exports = {

  
      postadd : function(req ,res){

                return res.view({});
            },


      savepage : function  (req,res) {
       console.log("sachjin");
       console.log(req.body);
        var imagepath = req.param('pic');
        var categary = req.param('categary'); 
        var addtitle = req.param('addtitle');
        var describe =req.param('describe');  
        var  sellarname = req.param('sellarname'); 
        var email = req.param('email');
        var mobno = req.param('mobno');
        var state = req.param('state');
        //add data in data base maching var and schaima
       

     Postdata.create({imagepath:imagepath,categary:categary,addtitle:addtitle,description:describe,sellarname:sellarname,email:email,mobno:mobno,state:state}, function(error, Postdata) {
      if (error) {
        console.log("error from here===");
        res.send(500, {error: "DB Error"});
      } else {


        res.json({success: true});
        
  
        console.log("data  inserted",Postdata);
      

      
              
      }
    });











//         var th = this;
//var imagepath = req.param('imagepath');
     // console.log(req.files);
             
     //                  fs.readFile(req.files.pic.path, function (err, data) {
     //            if(err){
     //           console.log(err);
     //           return th.view("postdata", {alert : "alert-message error", message : "Image Uploading Error", activePage: "postadd"});
     //            }
     //             var date = new Date(); // some mock date
     //             var milliseconds = date.getTime();
     //             var photopath = "/uploaded_photo/" + milliseconds + ".jpg" ;
     //             var newPath = __dirname +"../../assets/" + photopath;
     //             var newPath = path.resolve(newPath);
     //           fs.writeFile(newPath, data, function (err) {
     //                if(err){
     //                 console.log(err);
     //                return  th.view("home/postadd", {alert : "alert-message warning", message : "Image Not Uploaded", activePage: "postadd"});
     //               } else {
     //               postdata.imagepath = "http://"+th.req.headers.host + photopath;
     //               postdata.create(postdata)
     //                  return   th.view("home/postadd", {alert : "alert-message success", message : "Item Successfully saved.", activePage: "postadd"});
     //              }
     //              console.log(req.files.pic.path);
     //           }); 
     //      });  
        
                     
       
        
 },



  state : function(req ,res){
    //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var state = req.param('state');
    var editstatename = req.param('editstatename');
    var editstateid = req.param('editstateid');
    var deletestatename = req.param('deletestatename');
    console.log("delete id:---"+deletestatename);
    if (state)
    {
      console.log(state);
      State.create({state : state},function(err ,state){
        if(err)
        { 
             throw err;
             console.log(err);
          
        }
          else
          {
             State.find({},function(err,allstate){
                if(err)
                {
                  throw err;
                  console.log(err);
                }
                else
                {
                  console.log(allstate);
                  res.view({allstate : allstate});
                }
              });
          }

        });
      }
  else if (editstatename)
  {
    console.log(editstatename);
    State.update({id : editstateid},{state : editstatename})
     .exec(function(err,updatedata){
        if (err)
        {
        throw err;
        console.log(err);
        }
        else
        {
          State.find({},function(err,allstate){
              if (err)
              {
                  throw err;
                  console.log(err);
              }
              else
              {
                console.log("value edit state" +allstate);
                res.view({allstate : allstate});
              }

            });
        }
    });
  }

  else if (deletestatename){
        console.log(deletestatename);
    State.destroy({id: deletestatename})
      .exec(function(err,deletstate){  
      if (err)
      {
         throw err;
         console.log(err);
     }
     else{
        State.find({},function(err,allstate){
             if (err)
            {
                 throw err;
                console.log(err);
            }
            else
            {
              res.view({allstate : allstate});
            }

        });

    }
    });
  }
    else{

         State.find({},function(err,allstate){
            if (err)
            {
                throw err;
                console.log(err);
            }
            else
            {
              console.log("value withod create state" +allstate);
              res.view({allstate : allstate});
            }

          });
      }
  },

  location : function(req ,res){
    return res.view({});

  },
  city : function(req ,res){
    var myArrayCity = new Array();
    var state = req.param('state');
    var city  = req.param('city');
    if (state && city)
      {
        console.log("state:--"+state+"city:--"+city);
          State.findOne({state : state},function(err,allstate){
                  if (err)
                  {
                      throw err;
                      console.log(err);
                  }
                  else
                  {    
                        City.create({stateid : allstate.id,city : city})
                       .exec(function(err,city)
                       {
                           if (err)
                            {
                             throw err;
                             console.log(err);
                            }
                           else
                           {
                             State.find({},function(err ,state){
                                  if (err)
                                  {
                                   throw err;
                                   console.log(err);
                                  }
                                  else
                                  {
                                    var i = -1;
                                    function nextcity()
                                    {
                                      i++;
                                      if (state.length > i)
                                      {   
                                          City.findOne({stateid : state[i].id},function(err ,city){
                                            if (city)
                                            {
                                            if (err)
                                            {
                                             throw err;
                                             console.log(err);
                                            }
                                            else
                                            {
                                              state[i].city = city.city;
                                              myArrayCity.push(state[i]);
                                              nextcity();
                                            }
                                          }
                                          else
                                          {
                                           myArrayCity.push(state[i]);
                                           console.log("value of"+myArrayCity[0]);
                                           nextcity();
                                           
                                          }
                                          });
                                      }
                                      else
                                      {
                                        res.view({myArrayCity : myArrayCity})
                                      }
                                    }
                                    nextcity();
                                  }
                                });
                           }
                        })
                      
                  }
             });
        }
    

    else
    {  
      State.find({},function(err ,state){
        if (err)
        {
         throw err;
         console.log(err);
        }
        else
        {
          var i = -1;
          function nextcity()
          {
            i++;
            if (state.length > i)
            {   
                City.findOne({stateid : state[i].id},function(err ,city){
                  if (city)
                  {
                  if (err)
                  {
                   throw err;
                   console.log(err);
                  }
                  else
                  {
                    state[i].city = city.city;
                    myArrayCity.push(state[i]);
                    nextcity();
                  }
                }
                else
                {
                 myArrayCity.push(state[i]);
                 console.log("value of"+myArrayCity[0]);
                 nextcity();
                 
                }
                });
            }
            else
            {
              res.view({myArrayCity : myArrayCity})
            }
          }
          nextcity();
        }
      });
    }
  },
  _config: {}
};

