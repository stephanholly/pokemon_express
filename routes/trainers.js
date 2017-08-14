var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pokemon'
  }
});


router.get('/', function(req, res, next) {
  knex.raw('select * from trainers')
    .then(function(data) {
      console.log(data.rows);
      res.render('trainers', {title: 'Trainers!', trainers: data.rows});
    })
    .catch(function(err) {
  /*throw err;*/
  console.log(err);
  res.json(err);
});

});


// find trainer
router.get('/:id', function(req, res, next) {
  knex.raw(`select * from trainers where id = ${req.params.id}`)
    .then(function(data) {
      console.log(data.rows);
      res.render('indTrainer', {trainers: data.rows[0]});
    })
    .catch(function(err) {
  /*throw err;*/
  console.log(err);
  res.json(err);
});

});



module.exports = router;
