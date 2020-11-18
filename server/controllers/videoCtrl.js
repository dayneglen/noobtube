module.exports = {
    addVideo: (req, res) => {
        const {userId, title, description, video_url} = req.body,
              db = req.app.get('db');
        db.video.upload_video({userId, title, description, video_url}).then(_ => {
            res.sendStatus(200)
        }).catch(err => console.log(err));
    },
    getVideo: (req, res) => {
        const videoId = +req.params.id,
              db = req.app.get('db');

        db.video.get_video([videoId]).then(video => {
            res.status(200).send(video);
        }).catch(err => console.log(err));
    }, 
    editVideo: (req, res) => {
        const videoId = +req.params.id,
              {title, description} = req.body,
              db = req.app.get('db');

        db.video.edit_video({videoId, title, description}).then(_ => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    },
    getAllVideos: (req, res) => {
        const db = req.app.get('db');
            db.video.get_all_videos()
            .then(videos =>
                res.status(200).send(videos))
<<<<<<< HEAD
            .catch((err) => res.status(500).send(err));   

=======
            .catch((err) => res.status(500).send(err));    
>>>>>>> main
    },
    addView: (req, res) => {
        const videoId = +req.params.id,
              db = req.app.get('db');

        db.video.add_view(videoId).then(() => {
            res.sendStatus(200);
        }).catch(err => console.log(err));
    }
}
