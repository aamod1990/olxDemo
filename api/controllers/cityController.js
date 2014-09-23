module.exports = {
 city : function(req ,res){
    var myArrayCity = new Array();
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
                  if (err)
                  {
                   throw err;
                   console.log(err);
                  }
                  else if(city)
                  {
                    console.log(state[i], city.city);
                    state[i].city = city.city;
                    state[i].statename = city.state;
                    console.log(state[i]);
                    myArrayCity.push(state[i]);
                    nextcity();
                    
                  } 
                  else {
                    myArrayCity.push(state[i]);
                    nextcity();

                  }
                
                });
            }
            else
            {
              res.view('city/city',{myArrayCity : myArrayCity});
            }
          }
          nextcity();
        }
      });
  },
  createcity : function(req,res){
    var state1 = req.param('state');
    var city  = req.param('city');
    State.findOne({state : state1},function(err,state){
      if (err){
        throw err;
       console.log(err);
      }
      else{
           City.create({stateid : state.id,city :city,state : state1})
           .exec(function(err,city)
           {
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
     })
  },
  _config: {}
};