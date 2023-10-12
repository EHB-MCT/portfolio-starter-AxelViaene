console.log('Hello world')
const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const app = express()
const port = process.env.PORT || 3000;
app.use(express.json());
app.listen(port, (err) => {
    if(!err) {
        console.log("running on port" + port)
    }
    else {
        console.err(err)
    }
})