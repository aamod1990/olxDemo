module.exports = {

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