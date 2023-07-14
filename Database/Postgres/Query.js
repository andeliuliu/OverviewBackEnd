const db = require('./db');

// Create a new table
db.query(`
  CREATE TABLE IF NOT EXISTS your_table_name (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL
  );
`, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully!');
  }
});