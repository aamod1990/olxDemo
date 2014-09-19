module.exports = {
  createstate : function(req,res){
  	var state = req.param('state');
  	console.log(state);
  }
};