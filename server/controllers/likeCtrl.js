module.exports = {
  toggleLikedVideo: async (req, res) => {
    const { video_id, user_id } = req.body,
      db = req.app.get("db");

    const checkLikedVideo = await db.liked.check_like([user_id, video_id]);
    if (!checkLikedVideo[0]) {
      const addLike = await db.liked.add_like([user_id, video_id]);

      return res.sendStatus(200);
    }

    try {
      const deletedLike = await db.liked.delete_like([user_id, video_id]);
      return res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  },
  toggleDislikedVideo: async (req, res) => {
    const { video_id, user_id } = req.body,
      db = req.app.get("db");

    const checkDislikedVideo = await db.liked.check_dislike([user_id, video_id]);
    if (!checkDislikedVideo[0]) {
      const addDislike = await db.liked.add_dislike([user_id, video_id]);

      return res.sendStatus(200);
    }


    try {
      const deletedDislike = await db.liked.delete_dislike([user_id, video_id]);
      return res.sendStatus(200);
    } catch (err) {
      throw err;
    }
  },
  getLikes: (req, res) => {
    const videoId = +req.params.id,
            db = req.app.get('db');
    
    console.log(videoId)
    db.liked.get_likes([videoId]).then(likes => {
        res.status(200).send(likes);
    }).catch(err => console.log(err))
  },
  getDislikes: (req, res) => {
      const videoId = +req.params.id,
        db = req.app.get("db");

      db.liked
        .get_dislikes([videoId])
        .then((dislikes) => {
          res.status(200).send(dislikes);
        })
        .catch((err) => console.log(err));
  },
};
