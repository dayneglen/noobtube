module.exports = {
  editUserEmail: (req, res) => {
    const userId = +req.params.id,
      { email } = req.body,
      db = req.app.get("db");

    db.users
      .edit_email([email, userId])
      .then((user) => {
        res.status(200).send(user[0]);
      })
      .catch((err) => console.log(err));
  },
  editUsername: (req, res) => {
    const userId = +req.params.id,
      { username } = req.body,
      db = req.app.get("db");

    db.users
      .edit_username([username, userId])
      .then((user) => {
        res.status(200).send(user[0]);
      })
      .catch((err) => console.log(err));
  },
  deleteUser: (req, res) => {
    const { id } = req.params,
      db = req.app.get('db')

    db.users.delete_user({id})
    .then(() => res.sendStatus(200))
    .catch(err => {res.status(500).send(err)
    console.log(err)})
  },
  getUserVideos: (req, res) => {
    const { id } = req.params,
      db = req.app.get('db')

    db.users.get_user_videos({id})
    .then(videos => res.status(200).send(videos))
    .catch(err => console.log(err))
  },
  addProfilePic: (req, res) => {
    const { id } = req.params,
          {img_url} = req.body,
          db = req.app.get('db');

    db.users.add_profile_pic([img_url, id]).then(() => {
      res.sendStatus(200);
    }).catch(err => console.log(err));
  },
  getUser: (req, res) => {
    const { id } = req.params,
          db = req.app.get('db');

    db.users.get_user([id]).then(user => {
      res.status(200).send(user[0]);
    }).catch(err => console.log(err));
  }
};
