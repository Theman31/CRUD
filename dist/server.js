'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bear = require('../app/models/bear.js');

var _bear2 = _interopRequireDefault(_bear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.connect('mongodb://localhost/bears'); //will connect to the database.

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

//app.use('/', express.static(path.join(__dirname, "public")));
//app.use('/static', express.static(path.join(__dirname, 'public')))

var port = process.env.PORT || 3000;

var router = _express2.default.Router();
router.use(function (req, res, next) {
  console.log('Something magical is happening!');
  next();
});
router.route('/bears').post(function (_ref, res) {
  var body = _ref.body;

  var bear = new _bear2.default();
  bear.name = body.name;
  bear.save(function (err) {
    if (err) res.send(err);
    res.json({ message: 'Bear created' });
  });
}).get(function (req, res) {
  _bear2.default.find(function (err, bears) {
    if (err) res.send(err);
    res.json(bears);
  });
});
router.route('/bears/:bears_id').get(function (_ref2, res) {
  var params = _ref2.params;

  _bear2.default.findById(params.bears_id, function (err, bear) {
    if (err) res.send(err);
    res.json(bear);
  });
}).put(function (_ref3, res) {
  var params = _ref3.params,
      body = _ref3.body;

  _bear2.default.findById(params.bears_id, function (err, bear) {
    if (err) res.send(err);
    bear.name = body.name;

    bear.save(function (err) {
      if (err) res.send(err);
      res.json({ message: "That Bear has been updated!!" });
    });
  });
}).delete(function (_ref4, res) {
  var params = _ref4.params;

  _bear2.default.remove({
    _id: params.bears_id
  }, function (err, bear) {
    if (err) res.send(err);
    res.json({ message: "Now the Bear is Dead... I hope you're Happy... :`( " });
  });
});

router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});
app.use('/api', router);
app.listen(port, function () {
  return console.log("Example app listening to port 3000!");
});