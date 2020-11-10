require('dotenv').config();
const path = require('path');
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      s3Ctrl = require('./controllers/s3Ctrl'),
      videoCtrl = require('./controllers/videoCtrl'),
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
app.get('/sign-s3', s3Ctrl.videoUpload); 

// video endpoints
app.get('/api/video/:id', videoCtrl.getVideo);
app.get('/api/videos', videoCtrl.getAllVideos);
app.post('/api/video', videoCtrl.addVideo);
app.put('/api/video/:id', videoCtrl.editVideo);



// app.use(express.static(__dirname + '/../build'))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
// })



app.listen(port, () => console.log(`Server running on port ${port}`));