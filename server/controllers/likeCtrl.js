module.exports = {
    toggleLikedVideo: async (req, res) => {
        const { video_id, user_id } = req.body,
      db = req.app.get("db");

    const checkLikedVideo = await db.liked.check_like([
      user_id,
      video_id,
    ]);
    if (!checkLikedVideo[0]) {
        const addLike = await db.like
          .add_like([user_id, video_id])
        return res.sendStatus(200);
    }
  
    try {
      const deletedLike = await db.like.delete_like([
        user_id,
        video_id,
      ]);
      return res.sendStatus(200);
    }
    catch (err) {
        throw err
    }
  },
  toggleDislikedVideo: async (req, res) => {

  },
  getLikes: (req, res) => {

  },
  getDislikes: (req, res) => {
      
  }
    
}