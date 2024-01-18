const pgPromise = require('pg-promise')
const config = {
    host: 'localhost',
    port: '5432',
    database: 'pizzas',
    user: 'postgres',
    password: 'Dd2ekv12'
}
const pgp = pgPromise({})
const db = pgp(config)

db.any("select * from pizzas").then((res) => {
    console.table(res);
});


exports.db = db