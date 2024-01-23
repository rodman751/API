const { Router } = require('express');
const router = Router();
const {
    getIngredients,
    createIngredient,
    deleteIngredient,
    updateIngredient,
} = require('../controllers/ingredientes.controller');

router.get('/ingredients', getIngredients);
router.post('/ingredients', createIngredient);
router.delete('/deleteIngredient/:ing_id', deleteIngredient);
router.post('/updateIngredient', updateIngredient);

module.exports = router;
