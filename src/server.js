import express from "express";
import path from 'path';
import bodyParser from 'body-parser';
const app = express();
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/bears'); //will connect to the database.
import Bear from '../app/models/bear.js';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.use('/', express.static(path.join(__dirname, "public")));
//app.use('/static', express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000;

const router = express.Router();
router.use((req, res, next) => {
  console.log('Something magical is happening!');
  next();
});
router.route('/bears')
.post(({body}, res) => {
  const bear = new Bear();
  bear.name = body.name;
  bear.save(err => {
    if (err)
      res.send(err);
    res.json({message: 'Bear created' });
  });
})
.get((req, res) => {
   Bear.find((err, bears) => {
     if(err)
       res.send(err);
     res.json(bears);
   });
 });
router.route('/bears/:bears_id')
.get(({params}, res) => {
 Bear.findById(params.bears_id, (err, bear) => {
   if (err)
     res.send(err);
   res.json(bear);
 });
})
.put(({params, body}, res) => {
 Bear.findById(params.bears_id, (err, bear) => {
   if (err)
     res.send(err);
   bear.name = body.name;

   bear.save(err => {
     if (err)
       res.send(err);
     res.json({ message: "That Bear has been updated!!"});

   });
 });
})
.delete(({params}, res) => {
 Bear.remove({
   _id: params.bears_id
 }, (err, bear) => {
   if (err)
     res.send(err);
   res.json({ message: "Now the Bear is Dead... I hope you're Happy... :`( " });
 });
});

router.get('/', (req, res) => {
   res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);
app.listen(port, () => console.log("Example app listening to port 3000!"));
