//const { db } = require('../config/coneccion')
//db.any('SELECT * FROM pizzas').then(res => { console.log(res); })

//packages

const express = require('express')
const app = express()
const cors = require('cors');
const cors = require('cors');

//middlewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use(require('../routes/Rindex'));
app.use(require('../routes/Ringre'));
app.use(require('../routes/pizza_ingredients.routes'));


//Server execution
app.get('/', (req, res) => { res.send('Bienvenidos API-pizza') })
app.listen(3000)
console.log('Server running in: http://localhost:3000');

