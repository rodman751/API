const { Router } = require('express');
const router = Router();
const { getPizzas, crearPizza, eliminarPizza, editarPizza } = require('../controllers/pizaa.controller');

router.get('/pizzas', getPizzas);
router.post('/pizzas', crearPizza);
router.post('/borrar', eliminarPizza);
router.post('/update', editarPizza);
module.exports = router;
