module.exports = {
  location : function(req ,res){
    Location.find().populate('city').populate('state').exec(function(err,locations){
      State.find({},function(err,states){
       res.view({locations : locations,states :states});
      });
    });
  },
    getcity : function(req,res)
    {
       City.find().populate('state', {where: { id: req.body.stateid }}).exec(function(err, cities){
        if (err){
          req.flash('message','DB Error');
          res.redirect('back');
          throw err;
          console.log(err);
        }
        else
        {
          res.send({cities : cities});
        }
      });
    },
    createlocation : function(req,res)
    {
      console.log(req.body.state+"---"+ req.body.city+"--"+req.body.location);
      Location.find({location : req.body.location}).populate('state',{where: {id :req.body.state}}).populate('city',{where:{id :req.body.city}}).exec(function(err,locations){
        if (err){
          throw err;
          req.flash('message','DB Error');
        }
         else if(locations.length>0)
         {
              req.flash("message", "Location already exists");
              res.redirect('back');
         }
         else
         {
               Location.create({location : req.body.location ,city : req.body.city,state : req.body.state},function(err,location){
                   if (err)
                   {
                   throw err;
                   req.flash('message','DB Error');
                   }
                 else
                 {
                    req.flash('message','Location Created');
                    res.redirect('back');
                  }
              });
         }
      })
    },
    editlocation : function(req,res)
    {
      var editlocation = req.param('editlocation');
      var editlocationid = req.param('editlocationid');
      Location.update({id : editlocationid },{location : editlocation},function(err,location){
        if (err){
          throw err;
          req.flash('message','Db Error');
          res.redirect('back');
        }
        else if (location){
          req.flash('message','Update Successfully');
          res.redirect('back');
        }
      })
    },
    deletelocation : function(req, res){
      var id = req.param('id');
      console.log(id);
    Location.destroy({id : id}, function(err, location){
      if(err)
        req.flash("message", "Db Error");
      else if(location)
        req.flash("message", "Location Deleted");
      res.redirect('back');
    });
  },
_config: {}
};