import express from "express";
import path from 'path';
import bodyParser from 'body-parser';
const app = express();
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/bears'); //will connect to the database.
import Bear from'./app/models/bear.js';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.use('/', express.static(path.join(__dirname, "public")));
//app.use('/static', express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000;

const router = express.Router();
router.use(function(req, res, next) {
  console.log('Something magical is happening!');
  next();
});
router.route('/bears')
.post(function(req, res) {
  var bear = new Bear();
  bear.name = req.body.name;
  bear.save(function(err){
    if (err)
      res.send(err);
    res.json({message: 'Bear created' });
  });
})
.get(function(req, res) {
   Bear.find(function(err, bears) {
     if(err)
       res.send(err);
     res.json(bears);
   });
 });
 router.route('/bears/:bears_id')
.get(function(req, res) {
  Bear.findById(req.params.bears_id, function(err, bear) {
    if (err)
      res.send(err);
    res.json(bear);
  });
})
.put(function(req, res) {
  Bear.findById(req.params.bears_id, function(err, bear) {
    if (err)
      res.send(err);
    bear.name = req.body.name;

    bear.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: "That Bear has been updated!!"});

    });
  });
})
.delete(function(req, res) {
  Bear.remove({
    _id: req.params.bears_id
  }, function(err, bear) {
    if (err)
      res.send(err);
    res.json({ message: "Now the Bear is Dead... I hope you're Happy... :`( " });
  });
});

router.get('/', function(req, res) {
   res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);
app.listen(port, () => console.log("Example app listening to port 3000!"));
