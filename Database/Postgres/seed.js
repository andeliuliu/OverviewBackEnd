const db = require('./db.js');
require("dotenv").config();

db.connect()
 .then(() => {
        console.log("database connected")
    })
    .catch(() => {
        console.error("database not connected: ", err)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS products CASCADE`)
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
        db.query(`COPY products FROM '${process.env.PRODUCT}' DELIMITER ',' CSV HEADER;`)
    })
    .catch((err) => {
        console.error("failed to copy from product csv file", err)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS characteristics CASCADE`)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS characteristics (
                id SERIAL PRIMARY KEY,
                product_id BIGINT NOT NULL,
                name TEXT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id)

            )
        `)
    })
    .catch((err) => {
        console.error('Error creating characteristics table', err)
    })
    .then(() => {
        console.log("copied characteristics table successfully")
        return db.query(`
            COPY characteristics FROM '${process.env.CHARACTERISTICS}' DELIMITER ',' CSV HEADER;
        `)
    })
    .catch((err) => {
        console.error("failed to copy from characteristics csv file", err)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS features CASCADE`)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS features (
                id SERIAL PRIMARY KEY,
                product_id BIGINT NOT NULL,
                feature TEXT NOT NULL,
                value TEXT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `);
    })
    .catch((err) => {
        console.error('Error creating features table', err)
    })
    .then(() => {
        console.log("copied features table successfully")
        return db.query(`
            COPY features FROM '${process.env.FEATURES}' DELIMITER ',' CSV HEADER;
        `)
    })
    .catch((err) => {
        console.error("failed to copy from features csv file", err)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS styles CASCADE`)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS styles (
                id SERIAL PRIMARY KEY,
                productId BIGINT NOT NULL,
                name TEXT NOT NULL,
                sale_price TEXT,
                original_price INT, 
                default_style INT,
                FOREIGN KEY (productId) REFERENCES products(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating styles table', err)
    })
    .then(() => {
        console.log("copied styles table successfully")
        return db.query(`
            COPY styles FROM '${process.env.STYLES}' DELIMITER ',' CSV HEADER;
        `)
    })
    .catch((err) => {
        console.error("failed to copy from styles csv file", err)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS photos CASCADE`)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS photos (
                id SERIAL PRIMARY KEY,
                style_id BIGINT NOT NULL,
                url TEXT NOT NULL,
                thumbnail_url TEXT NOT NULL,
                FOREIGN KEY (style_id) REFERENCES styles(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating photos table', err)
    })
    .then(() => {
        console.log("copied photos table successfully")
        return db.query(`
            COPY photos FROM '${process.env.PHOTOS}' DELIMITER ',' CSV HEADER;
        `)
    })
    .catch((err) => {
        console.error("failed to copy from photos csv file", err)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS skus CASCADE`)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS skus (
                id SERIAL PRIMARY KEY,
                style_id BIGINT NOT NULL,
                size TEXT NOT NULL,
                quantity INT NOT NULL,
                FOREIGN KEY (style_id) REFERENCES styles(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating skus table', err)
    })
    .then(() => {
        console.log("copied skus table successfully")
        return db.query(`
            COPY skus FROM '${process.env.SKUS}' DELIMITER ',' CSV HEADER;
        `)
    })
    .catch((err) => {
        console.error("failed to copy from skus csv file", err)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS reviews CASCADE`)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                product_id BIGINT NOT NULL,
                rating INT NOT NULL,
                date BIGINT NOT NULL,
                summary TEXT NOT NULL,
                body TEXT NOT NULL,
                recommend BOOLEAN NOT NULL,
                reported BOOLEAN NOT NULL,
                reviewer_name TEXT NOT NULL,
                reviewer_email TEXT NOT NULL,
                response TEXT,
                helpfulness INT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id)

            )
        `)
    })
    .catch((err) => {
        console.error('Error creating reviews table', err)
    })
    .then(() => {
        console.log("copied reviews table successfully")
        return db.query(`
            COPY reviews FROM '${process.env.REVIEWS}' DELIMITER ',' CSV HEADER;
        `)
    })
    .catch((err) => {
        console.error("failed to copy from reviews csv file", err)
    })
    .then(() => {
        return db.query(`DROP TABLE IF EXISTS cart CASCADE`)
    })
    .then(() => {
        return db.query(`
            CREATE TABLE IF NOT EXISTS cart (
                id SERIAL PRIMARY KEY,
                user_session INT NOT NULL,
                product_id BIGINT NOT NULL,
                active INT NOT NULL,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `)
    })
    .catch((err) => {
        console.error('Error creating cart table', err)
    })
    .then(() => {
        console.log("copied cart table successfully")
        return db.query(`
            COPY cart FROM '${process.env.CART}' DELIMITER ',' CSV HEADER;
        `)
    })
    .catch((err) => {
        console.error("failed to copy from reviews csv file", err)
    })
