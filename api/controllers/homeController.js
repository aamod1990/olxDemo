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
  _config: {}
};

