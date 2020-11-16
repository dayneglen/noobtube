module.exports = {
  toggleLikedVideo: async (req, res) => {
    const { video_id, user_id } = req.body,
      db = req.app.get("db");

    const checkLikedVideo = await db.liked.check_like([user_id, video_id]);
    const checkDislikedVideo = await db.liked.check_dislike([user_id, video_id]);

    try {
      if (!checkLikedVideo[0] && !checkDislikedVideo[0]) {
        const addLike = await db.liked.add_like([user_id, video_id]);
        return res.sendStatus(200);
      } else if (!checkLikedVideo[0] && checkDislikedVideo[0]) {
        const deletedDislike = await db.liked.delete_dislike([
          user_id,
          video_id,
        ]);
        const addLike = await db.liked.add_like([user_id, video_id]);
        return res.sendStatus(200);
      } else if (checkLikedVideo[0] && !checkDislikedVideo[0]) {
        const deletedLike = await db.liked.delete_like([user_id, video_id]);
        return res.sendStatus(200);
      }
    } catch (err) {
      throw err;
    }
  },
  toggleDislikedVideo: async (req, res) => {
    const { video_id, user_id } = req.body,
      db = req.app.get("db");

    const checkLikedVideo = await db.liked.check_like([user_id, video_id]);
    const checkDislikedVideo = await db.liked.check_dislike([
      user_id,
      video_id,
    ]);

    try {
      if (!checkLikedVideo[0] && !checkDislikedVideo[0]) {
        const addDislike = await db.liked.add_dislike([user_id, video_id]);
        return res.sendStatus(200);
      } else if (!checkLikedVideo[0] && checkDislikedVideo[0]) {
        const deleteDislike = await db.liked.delete_dislike([user_id, video_id]);
        return res.sendStatus(200);
      } else if (checkLikedVideo[0] && !checkDislikedVideo[0]) {
        const deletedLike = await db.liked.delete_like([user_id, video_id]);
        const addDislike = await db.liked.add_dislike([user_id, video_id]);
        return res.sendStatus(200);
      }
    } catch (err) {
      throw err;
    }
  },
  getLikes: (req, res) => {
    const videoId = +req.params.id,
            db = req.app.get('db');
    
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
