const { Router } = require('express');
const router = Router();
const {
    getPizzaIngredients,
    createPizzaIngredient,
    getAllPizzaIngredients,
    getPizzaIngredientById,
    updatePizzaIngredient,
    deletePizzaIngredientById
} = require('../controllers/pizzaingredients.controller');

router.get('/pizzaIngredients', getPizzaIngredients);
router.get('/pizzaIngredientsbyid', getPizzaIngredientById);
router.post('/crearPizza', createPizzaIngredient);
router.delete('/eliminarPizza/:pi_id', deletePizzaIngredientById);
router.post('/editarPizza', updatePizzaIngredient);

module.exports = router;
