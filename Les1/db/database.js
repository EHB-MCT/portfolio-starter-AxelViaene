const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database or open an existing one
const db = new sqlite3.Database('testGameDB');

// Define the "games" table schema and create the table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      release_year INTEGER,
      producer TEXT
    )
  `);
});

// Close the database connection when done
// db.close((err) => {
//     if (err) {
//       console.error('Error closing the database:', err.message);
//     } else {
//       console.log('Database connection closed.');
//     }
//   });

  module.exports = db