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
    
  }
};
