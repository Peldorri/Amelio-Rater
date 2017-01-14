var express=require('express');

var userRoutes=function(Users){

var userRouters= express.Router();

var userController= require('../Controllers/userController')(Users);
  userRouters.route('/')
            .post(userController.post)
            .get(userController.get);

  userRouters.route('/:userId/trip')
              .post(userController.pushTrips);

  userRouters.use('/:userId',function(req,res,next){
        Users.findById(req.params.userId,function(err,user){
            if(err)
                res.status(500).send(err);
            else if (user){
                req.user=user;
                next();

            }
            else{

                res.status(404).send('user not found');
            }
        });

  });
  userRouters.route('/:userId')
          /*  .get(function(req,res){
                res.json(req.user);
            })*/
            .patch(userController.patch)
            .delete(userController.delete);


userRouters.route('/:userId/locations')
          .get(userController.getLocations);

        return userRouters;
};

module.exports=userRoutes;
