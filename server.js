const express = require('express');
const db = require('./db');
const path = require('path');
const app = express();

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/people', async(req, res, next)=> {
  try {
    res.send( await db.models.Person.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/places', async(req, res, next)=> {
  try {
    res.send( await db.models.Place.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/things', async(req, res, next)=> {
  try {
    res.send( await db.models.Thing.findAll());
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

db.syncAndSeed()
  .then(()=> app.listen(port, ()=> console.log(`listening on port ${port}`)));
