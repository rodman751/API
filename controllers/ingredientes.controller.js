const { db } = require('../config/coneccion');

const getIngredients = async (req, res) => {
    try {
        const response = await db.any('SELECT * FROM ingredients');
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createIngredient = async (req, res) => {
    try {
        const { ing_name, ing_calories ,ing_state} = req.body;
        const response = await db.one(
            `INSERT INTO ingredients(ing_name, ing_calories, ing_state) VALUES ($1, $2, $3) RETURNING *;`,
            [ing_name, ing_calories, ing_state]
        );

        console.log(response);

        res.json({
            message: 'created',
            body: {
                ingredient: {
                    ing_name,
                    ing_calories,
                },
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteIngredient = async (req, res) => {
    try {
        const { ing_id } = req.params;

        // Eliminar referencias en pizzas_ingredients
        await db.none(`DELETE FROM pizzas_ingredients WHERE ing_id = $1;`, [ing_id]);

        // Eliminar el ingrediente
        const response = await db.result(`DELETE FROM ingredients WHERE ing_id=$1;`, [ing_id]);

        console.log(response);

        res.json({
            message: 'deleted',
            body: {
                ingredient: {
                    ing_id,
                },
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error asd' });
    }
};


const updateIngredient = async (req, res) => {
    try {
        const { ing_id, ing_name, ing_calories, ing_state } = req.body;
        console.log(ing_id, ing_name, ing_calories, ing_state);
        const response = await db.one(`
            UPDATE ingredients
            SET ing_name=$2, ing_calories=$3, ing_state=$4
            WHERE ing_id=$1
            RETURNING *;
        `, [ing_id, ing_name, ing_calories, ing_state]);

        console.log(response);

        res.json({
            message: 'updated',
            body: {
                ingredient: response,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getIngredients,
    createIngredient,
    deleteIngredient,
    updateIngredient,
};
