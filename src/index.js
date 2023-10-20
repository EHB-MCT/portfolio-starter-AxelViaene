const express = require('express')

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json());

const db = require('../db/database.js')

/* 
GET endpoint, displays all users from table 'users'
*/

app.get("/users", (req, res) => {
    const sqlQuery = 'SELECT * FROM users';
    // Execute the SQL query
    db.query(sqlQuery, [], (err, rows) => {
        if (err) {
          // Handle any errors and send an error response
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ users: rows });
      });
})


/* 
GET endpoint, displays one user from table 'users'
@params number(int): user_id of a user
@returns object: JSON response with user details
*/

app.get('/users/:id', (req, res) => {
    const user_id = req.params.id;

    const sqlQuery = 'SELECT * FROM users WHERE user_id = ?';
    // Execute the SQL query
    db.query(sqlQuery, [user_id], (err, rows) => {
        if (err) {
            // Handle any errors and send an error response
            res.status(500).json({ error: err.message });
            return;
        }

        if (rows.length === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json({ user: rows[0] });
    });
});

/* 
POST endpoint, adds a user to table 'users'
@params req.body: the requested body containing user details
@returns object: JSOn response with ID and details of newly inserted user 
*/
app.post('/add_user', (req, res) => {
    const { user_id, user_name, user_password } = req.body;
    // SQL query to insert a new user into the "users" table
    const sqlQuery = 'INSERT INTO users (user_id, user_name, user_password) VALUES (?, ?, ?)';

    // Execute the SQL query
    db.query( sqlQuery, [user_id, user_name, user_password], function (err, result) {
      if (err) {
        // Handle any errors and send an error response
        res.status(500).json({ error: err.message });
        return;
      }
      // Send a JSON response with the newly inserted user data
      res.json({
        id: result.insertId,
        user_id,
        user_name,
        user_password });
    });
});

/* 
PUT endpoint, updates a user by user_id in the 'users' table
@params req.params.id: The identifier of the updated user
@params req.body: the details of the user to be updated
*/
app.put('/users/:id', (req, res) => {
    const user_id = req.params.id;
    const { user_name, user_password } = req.body;

    const sqlQuery = 'UPDATE users SET user_name = ?, user_password = ? WHERE user_id = ?';
    // Execute the SQL query 
    db.query(sqlQuery, [user_name, user_password, user_id], (err) => {
      if (err) {
        // Handle any errors and send an error response
        res.status(500).json({ error: err.message });
        return;
      }
      const succesMessage = result.affectedRows > 0 ? 'User updated successfully' : 'User not found';
      res.json({ message: succesMessage });
    });
});

/* 
DEL endpoint 
*/
app.delete('/users/:id', (req, res) => {
    const user_id = req.params.id;
  
    const sqlQuery = 'DELETE FROM users WHERE user_id = ?';
    // Execute the SQL query
    db.query(sqlQuery, [user_id], (err, result) => {
      if (err) {
        // Handle any errors and send an error response
        res.status(500).json({ error: err.message });
        return;
      }

      const succesMessage = result.affectedRows > 0 ? 'User deleted successfully' : 'User not found';
      res.json({ message: succesMessage });
    });
});


//redirect root path to all users
app.get("/", (req, res) => {
    res.redirect("/users")
})

//start the server
app.listen(port, (err) => {
    if(!err) {
        console.log("running on port" + port)
    }
    else {
        console.err(err)
    }
})