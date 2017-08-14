var express = require('express');
var router = express.Router();
var knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'pokemon'
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  knex.raw('select * from pokemon')
    .then(function(data) {
      console.log(data.rows);
      res.render('pokemon', {title: 'Pokemon!', pokemon: data.rows});
    })
    .catch(function(err) {
  /*throw err;*/
  console.log(err);
  res.json(err);
});

});

// router.new('/new', function(req, res, next) {
//   res.render('new_poke');
// });

// find pokemon
router.get('/:id', function(req, res, next) {
  knex.raw(`select * from pokemon where id = ${req.params.id}`)
    .then(function(data) {
      console.log(data.rows);
      res.render('indPokemon', {pokemon: data.rows[0]});
    })
    .catch(function(err) {
  /*throw err;*/
  console.log(err);
  res.json(err);
});

});


// go to edit pokemon
router.get('/:id/edit', function(req, res, next) {
  knex.raw(`select * from pokemon where id = ${req.params.id}`)
    .then(function(data) {
      console.log(data.rows);
      res.render('edit_poke', {pokemon: data.rows[0]});
    })
    .catch(function(err) {
  /*throw err;*/
  console.log(err);
  res.json(err);
});
});

// edit pokemon
router.post('/:id', function(req, res, next) {
  knex.raw(`update pokemon set name = '${req.body.name}', type = '${req.body.type}', trainer_id = ${req.body.trainer_id} where id = ${req.params.id}`)
    .then(function(data) {
      res.redirect('/pokemon');
    })
    .catch(function(err) {
  /*throw err;*/
  console.log(err);
  res.json(err);
});
});

// delete pokemon
router.post('/:id/delete', function(req, res, next) {
  knex.raw(`delete from pokemon where id = ${req.params.id}`)
    .then(function(data) {
      res.redirect('/pokemon');
    })
    .catch(function(err) {
  /*throw err;*/
  console.log(err);
  res.json(err);
});
});




module.exports = router;
