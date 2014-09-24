module.exports = {

  city : function(req ,res){
      City.find().populate('state').exec(function(err, cities){
        State.find({}, function(err, states){
          res.view({cities : cities, states : states});
        });

      });
  },

  createcity : function(req, res){
    City.find({city : req.body.city}).populate('state', {where: { id: req.body.state }}).exec(function(err, cities){
      if(err){
        req.flash("message", "db Error");
        res.redirect('back');
      }
      else if(cities.length>0){
        req.flash("message", "city already exists");
        res.redirect('back');
      }
      else{
        City.create({city : req.body.city, state : req.body.state}, function(err, city){
          if(err)
              req.flash('message', 'error creatting city');
          res.redirect('back');
        }) 
      }
    });
  },

  editcity : function(req, res){
    City.find({city : req.body.city}).populate('state', {where: { id: req.body.state }}).exec(function(err, cities){
      if(err){
        req.flash("message", "db Error");
        res.redirect('back');
      }
      else if(cities.length>0){
        req.flash("message", "city already exists");
        res.redirect('back');
      }
      else{
        City.update({id : req.body.cityid}, {city : req.body.city}, function(err, city){
          if(err)
              req.flash('message', 'error Updating city');
          res.redirect('back');
        }) 
      }
    }); 
  },

  deletecity : function(req, res){
    City.destroy({id : req.param("id")}, function(err, city){
      if(err)
        req.flash("message", "Db Error");
      else if(city)
        req.flash("message", "City Deleted");
      res.redirect('back');
    });
  }
  ,_config: {}
};