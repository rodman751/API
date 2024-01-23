const { db } = require('../config/coneccion')

const getPizzaIngredients = async (req, res) => {
    try {
        const response = await db.any(`
        SELECT
        pi.pi_id,
        pi.pi_portion,
        p.piz_name,
        p.piz_origin,
        p.piz_state,
        i.ing_name,
        i.ing_calories,
        i.ing_state
    FROM
        public.pizzas_ingredients pi
    JOIN
        public.pizzas p ON pi.piz_id = p.piz_id
    JOIN
        public.ingredients i ON pi.ing_id = i.ing_id;
        `);

        res.json(response);
    } catch (error) {
        console.error("Error fetching pizza ingredients:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const createPizzaIngredient = async (req, res) => {
    try {
        const { piz_name, piz_origin, piz_state, ing_name, ing_calories, ing_state, pi_portion } = req.body;

        // Verifica que los campos requeridos no sean nulos antes de la inserción
        if (!piz_name || !piz_origin || piz_state === undefined || !ing_name || ing_calories === undefined || ing_state === undefined || !pi_portion) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Insertar datos en la tabla 'pizzas'
        const pizzaResponse = await db.one(
            'INSERT INTO public.pizzas(piz_name, piz_origin, piz_state) VALUES ($1, $2, $3) RETURNING piz_id;',
            [piz_name, piz_origin, piz_state]
        );

        const piz_id = pizzaResponse.piz_id;

        // Insertar datos en la tabla 'ingredients'
        const ingredientResponse = await db.one(
            'INSERT INTO public.ingredients(ing_name, ing_calories, ing_state) VALUES ($1, $2, $3) RETURNING ing_id;',
            [ing_name, ing_calories, ing_state]
        );

        const ing_id = ingredientResponse.ing_id;

        // Insertar datos en la tabla 'pizzas_ingredients'
        const response = await db.one(
            'INSERT INTO public.pizzas_ingredients(pi_id, piz_id, ing_id, pi_portion) VALUES (DEFAULT, $1, $2, $3) RETURNING *;',
            [piz_id, ing_id, pi_portion]
        );

        console.log(response);
        res.json(response);
    } catch (error) {
        console.error('Error creating pizza ingredient:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// READ (Obtener todos los registros)
const getAllPizzaIngredients = async () => {
    try {
        const pizzaIngredients = await db.any('SELECT * FROM public.pizzas_ingredients');
        return pizzaIngredients;
    } catch (error) {
        throw new Error(`Error fetching pizza ingredients: ${error.message}`);
    }
};


const getPizzaIngredientById = async (req, res) => {
    try {
        const { pi_id } = req.query;

        // Verifica que el campo requerido no sea nulo antes de la consulta por ID
        if (!pi_id) {
            return res.status(400).json({ error: 'El campo pi_id es obligatorio para obtener un pizza ingredient por ID.' });
        }

        const pizzaIngredient = await db.one(`
            SELECT
                pi.pi_id,
                p.piz_name,
                i.ing_name,
                pi.pi_portion
            FROM
                public.pizzas_ingredients pi
            JOIN
                public.pizzas p ON pi.piz_id = p.piz_id
            JOIN
                public.ingredients i ON pi.ing_id = i.ing_id
            WHERE
                pi.pi_id = $1;
        `, [pi_id]);

        res.json(pizzaIngredient);
    } catch (error) {
        console.error('Error fetching pizza ingredient by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updatePizzaIngredient = async (req, res) => {
    try {
        const { pi_id, piz_id, ing_id, pi_portion } = req.query;

        // Verifica que los campos requeridos no sean nulos antes de la actualización
        if (!pi_id || !piz_id || !ing_id || !pi_portion) {
            return res.status(400).json({ error: 'Los campos pi_id, piz_id, ing_id y pi_portion son obligatorios.' });
        }

        const updatedPizzaIngredient = await db.one(
            'UPDATE public.pizzas_ingredients SET piz_id = $1, ing_id = $2, pi_portion = $3 WHERE pi_id = $4 RETURNING *',
            [piz_id, ing_id, pi_portion, pi_id]
        );

        console.log(updatedPizzaIngredient);
        res.json(updatedPizzaIngredient);
    } catch (error) {
        console.error('Error updating pizza ingredient:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deletePizzaIngredientById = async (req, res) => {
    try {
        const { pi_id } = req.query;

        // Verifica que el campo requerido no sea nulo antes de la eliminación
        if (!pi_id) {
            return res.status(400).json({ error: 'El campo pi_id es obligatorio para la eliminación.' });
        }

        await db.none('DELETE FROM public.pizzas_ingredients WHERE pi_id = $1', [pi_id]);

        res.json({ message: 'Pizza ingredient deleted successfully' });
    } catch (error) {
        console.error('Error deleting pizza ingredient by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getPizzaIngredients,
    createPizzaIngredient,
    getAllPizzaIngredients,
    getPizzaIngredientById,
    updatePizzaIngredient,
    deletePizzaIngredientById,
};
