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
  .then((dicks) => {
    res.json(dicks)
  });
});



app.post('/pokemon', function (req, res, next){
  knex('pokemon')
  .insert({
    name: req.body.name,
    type: req.body.type,
    size: req.body.size
  }, 'id').then((whatever) => {
    res.json(whatever)
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
