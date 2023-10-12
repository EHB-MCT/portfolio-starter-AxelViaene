const express = require('express')
const sqlite3 = require('sqlite3').verbose();

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());

const db = require('../db/database.js')

// Create a game (C)
app.post('/games', (req, res) => {
    const { title, release_year, producer } = req.body;

    db.run('INSERT INTO games (title, release_year, producer) VALUES (?, ?, ?)', [title, release_year, producer], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, title, release_year, producer });
    });
  });

// Read all games 
app.get("/", (req, res) => {
    db.all('SELECT * FROM games', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ games: rows });
      });
})


// Update a game by ID (U)
app.put('/games/:id', (req, res) => {
    const gameId = req.params.id;
    const { title, release_year, producer } = req.body;
  
    db.run('UPDATE games SET title = ?, release_year = ?, producer = ? WHERE id = ?', [title, release_year, producer, gameId], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Game updated successfully' });
    });
  });

// Delete a game by ID (D)
app.delete('/games/:id', (req, res) => {
    const gameId = req.params.id;
  
    db.run('DELETE FROM games WHERE id = ?', [gameId], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Game deleted successfully' });
    });
  });


//start the server
app.listen(port, (err) => {
    if(!err) {
        console.log("running on port" + port)
    }
    else {
        console.err(err)
    }
})