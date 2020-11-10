require('dotenv').config();

const path = require('path')
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),

      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      port = SERVER_PORT,
      app = express();

app.use(express.json());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 365}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('db connected');
});

//auth endpoints

//comment endpoints

//user endpoints

// s3 endpoints

// video endpoints



// app.use(express.static(__dirname + '/../build'))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
// })



app.listen(port, () => console.log(`Server running on port ${port}`));