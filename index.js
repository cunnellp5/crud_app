const express = require ('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const knex = require('./db/knex');

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Listening on ${port}`);
});


app.get('/pokemon', function(req, res){
  knex("pokemon")
  .select()
  .then((data) => {
    res.json(data)
  });
});



app.post('/pokemon', function (req, res, next){
  knex('pokemon')
  .insert({
    name: req.body.name,
    type: req.body.type,
    size: req.body.size
  }, 'id').then((data) => {
    res.json(data)
  });
});


app.delete('/pokemon/:id', (req, res) => {
  knex('pokemon')
  .where('id', req.params.id)
  .del()
  .then((data) => {
    res.json(data);
  });
});

app.put('/pokemon/:id', function (req, res, next){
  knex('pokemon')
  .where('id', req.params.id)
  .update({
    name: req.body.name,
    type: req.body.type,
    size: req.body.size
  })
    .then((data) =>{
    res.json(data)
  });
});


// router.put('/:id', function(req, res){
//
//   Albums().where('id', req.params.id).update({
//     stars: req.body.stars
//   }).then(function(result){
//     res.json(result);
//   });
//
// });
