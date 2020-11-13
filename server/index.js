require('dotenv').config();
const path = require('path');
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      s3Ctrl = require('./controllers/s3Ctrl'),
      videoCtrl = require('./controllers/videoCtrl'),
      authCtrl = require('./controllers/authCtrl'),
      commentCtrl = require('./controllers/commentCtrl'),
      subscriberCtrl = require('./controllers/subscriberCtrl'),
      userCtrl = require('./controllers/userCtrl'),
      likeCtrl = require('./controllers/likeCtrl'),
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
app.post('/api/register', authCtrl.register);
app.post('/api/login', authCtrl.login);
app.get('/api/logout', authCtrl.logout);

//comment endpoints
app.get('/api/comments/:id', commentCtrl.getComments);
app.post('/api/comment', commentCtrl.addComment);
app.put('/api/comment/:id', commentCtrl.editComment);
app.delete('/api/comment/:id', commentCtrl.deleteComment);

//subscriber endpoints
app.post('/api/subscription', subscriberCtrl.toggleSubscription);
app.get('/api/subscription/:id', subscriberCtrl.getSubscribers);

//user endpoints
app.put('/api/user/email/:id', userCtrl.editUserEmail);
app.put('/api/user/username/:id', userCtrl.editUsername);
app.delete('/api/user/:id', userCtrl.deleteUser);
app.get('/api/user/videos/:id', userCtrl.getUserVideos);

// s3 endpoints
app.get('/sign-s3', s3Ctrl.videoUpload); 
app.post('/api/s3/deleteVideo/:id', s3Ctrl.deleteVideo);

// video endpoints
app.get('/api/video/:id', videoCtrl.getVideo);
app.get('/api/videos', videoCtrl.getAllVideos);
app.post('/api/video', videoCtrl.addVideo);
app.put('/api/video/:id', videoCtrl.editVideo);

//like/dislike endpoints
app.post('/api/likes', likeCtrl.toggleLikedVideo);
app.post('/api/dislikes', likeCtrl.toggleDislikedVideo);
app.get('/api/like/:id', likeCtrl.getLikes);
app.get('/api/dislike/:id', likeCtrl.getDislikes);

// app.use(express.static(__dirname + '/../build'))

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
// })



app.listen(port, () => console.log(`Server running on port ${port}`));