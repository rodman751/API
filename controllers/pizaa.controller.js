const { db } = require('../config/coneccion')

const getPizzas = async (req, res) => {
    const response = await db.any('select * from pizzas');
    res.json(response);
};
const crearPizza = async (req, res) => {
    const { piz_name, piz_origin } = req.body;
    const response = await db.any(
        `INSERT INTO public.pizzas(piz_name, piz_origin, piz_state) VALUES ($1, $2, true) RETURNING *;`,
        [piz_name, piz_origin]
    );

    console.log(response);

    res.json(response);
};
const eliminarPizza = async (req, res) => {
    const { piz_id } = req.params;

    const response1 = await db.any(`DELETE FROM pizzas_ingredients
	WHERE piz_id=$1;`, [piz_id]);
    const response2 = await db.any(`DELETE FROM pizzas
	WHERE piz_id=$1;`, [piz_id]);
    console.log(response2);

    res.json({
        message: 'borrado',
        body: {
            pizza: {
                piz_id,
            },
        },
    });
};

const editarPizza = async (req, res) => {
    const { piz_id } = req.params;
    const { piz_name, piz_origin, piz_state } = req.body;
    const response = await db.any(`
        UPDATE pizzas
        SET piz_name=$2, piz_origin=$3, piz_state=$4
        WHERE piz_id=$1;
    `, [piz_id, piz_name, piz_origin, piz_state]);

    console.log(response);

    res.json({
        message: 'actualizado',
        body: {
            pizza: {
                piz_id, piz_name, piz_origin, piz_state
            },
        },
    });
};


module.exports = {
    getPizzas,
    crearPizza,
    eliminarPizza,
    editarPizza

};