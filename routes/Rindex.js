const { Router } = require('express');
const router = Router();
const { getPizzas, crearPizza, eliminarPizza, editarPizza } = require('../controllers/pizaa.controller');

router.get('/pizzas', getPizzas);
router.post('/pizzas', crearPizza);
router.delete('/borrar/:piz_id', eliminarPizza);
router.post('/update/:piz_id', editarPizza);
module.exports = router;
