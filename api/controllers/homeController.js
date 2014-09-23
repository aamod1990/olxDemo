module.exports = {

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
  
  _config: {}
};