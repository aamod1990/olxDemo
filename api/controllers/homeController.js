var path = require('path');
var fs = require('fs');
module.exports = {

  
      postadd : function(req ,res)
        {

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
             
            City.find().populate('state').exec(function(err, cities){
               State.find({}, function(err, states){
                res.view({cities : cities, states : states});
                console.log(states);
             });

           });  





       },


      savepage : function  (req,res) {
       
      console.log("sachjin");
       
      // req.file('pic').upload(function (err, uploadedFiles) {
      //   if (err) return res.send(500, err);

      //   console.log(
      //     {
      //       message: uploadedFiles.length + ' file(s) uploaded successfully!',
      //       files: uploadedFiles

      //     }

      //   );
      // });

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
  },



  state : function(req ,res){
    //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var state = req.param('state');
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
  },
  createstate : function(req,res){
    var state = req.param('state');
    State.findOne({state : state},function(err,duplicatestate){
      if (duplicatestate){
        req.flash('message','already exits');
        res.redirect('back');
      }
      else
      {
        State.create({state : state},function(err,state){
          if (err){
            throw err;
          }
          else
          {
            res.redirect('back');
          }
        })
      }
    })
  },
  editstate : function(req,res){
    var state = req.param('editstatename');
    var editstateid = req.param('editstateid');
    State.findOne({state : state},function(err,duplicatestate){
      if (duplicatestate)
      {
        req.flash('message','already exits');
        res.redirect('back');
      }
      else
      {
        State.update({id : editstateid},{state : state})
       .exec(function(err,updatedata){
        if (err)
        {
        throw err;
        console.log(err);
        }
        else
        {
          res.redirect('back');
        }
      });
      }
    });
  },
  deletestate : function(req ,res){
   var deletestateid = req.param('deletestateid');
    State.destroy({id: deletestateid})
      .exec(function(err,deletstate){
      if (err)
      {
       console.log(err);
      }
      else
      {
        res.redirect('back');
      }  
      })
  },

  location : function(req ,res){
    var state = req.param('state');
    var city  = req.param('city');
    var location = req.param('location');
    console.log(state+"city:--"+city+"location:-"+location);
    if (state && city && location){
      console.log("somethin enter");
    }
    else
    // {
    //   State.find({},function(err ,state){
    //     if (err)
    //     {
    //      throw err;
    //      console.log(err);
    //     }
    //     else
    //     {
    //      var i =-1;
    //      function next()
    //      {
    //       if (true) {};
    //      }
    //     }
    //   });
    res.view({});
  },

categary : function(res,res){

  return res.view({});
},

  
  
  _config: {}
};

