//const { db } = require('../config/coneccion')
//db.any('SELECT * FROM pizzas').then(res => { console.log(res); })

//packages

const express = require('express')
const app = express()

//middlewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(require('../routes/Rindex'));


//Server execution
app.get('/', (req, res) => { res.send('Bienvenidos API-pizza') })
app.listen(3000)
console.log('Server running in: http://localhost:3000');

