const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/overview';

const db = new Client({
    connectionString: connectionString
});
db.connect()
    .then(() => {
        console.log("database connected")
    })
    .catch(() => {
        console.error(err)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                slogan TEXT NOT NULL,
                description TEXT NOT NULL,
                category TEXT NOT NULL,
                default_price INT NOT NULL
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating products table', err);
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS characteristics (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                product_id INT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating characteristics table', err)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS features (
                id SERIAL PRIMARY KEY,
                feature TEXT NOT NULL,
                value TEXT NOT NULL,
                product_id INT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating features table', err)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS styles (
                id SERIAL PRIMARY KEY,
                product_id INT NOT NULL,
                name TEXT NOT NULL,
                sale_price INTEGER,
                original_price INT, 
                default_style INT,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating styles table', err)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS photos (
                id SERIAL PRIMARY KEY,
                style_id INT NOT NULL,
                url TEXT NOT NULL,
                thumbnail_url TEXT NOT NULL,
                FOREIGN KEY (style_id) REFERENCES styles(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating features table', err)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS skus (
                id SERIAL PRIMARY KEY,
                style_id INT NOT NULL,
                size TEXT NOT NULL,
                quantity INT NOT NULL,
                FOREIGN KEY (style_id) REFERENCES styles(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating features table', err)
    })
    .then(() => {
        return db.query(`
        `)
    })

var app = express();
var port = process.env.PG_PORT || 4000

app.set('port', port);
// app.get('/', function (req, res, next) {
//     client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err);
//         }
//         res.status(200).send(result.rows);
//     });
// });
app.listen(port, function () {
    console.log('Server is running.. on ' + port);
});