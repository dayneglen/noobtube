module.exports = {
  getTagList: (req, res) => {
    const db = req.app.get('db')

    db.tags.get_tag_list()
    .then(tags => res.status(200).send(tags))
    .catch(err => res.status(500).send(err))
  },
  getVideoTags: (req, res) => {
    const { id } = req.params,
      db = req.app.get('db')

    db.tags.get_video_tags(id)
    .then(tags => res.status(200).send(tags))
    .catch(err => res.status(500).send(err))
  },
  tagVideo: (req, res) => {
    const { id } = req.params,
      { tag_id } = req.body,
      db = req.app.get('db')

    db.tags.tag_video({ id, tag_id })
    .then(tags => res.status(200).send(tags))
    .catch(err => res.status(500).send(err))
  },
  untagVideo: (req, res) => {
    const { id } = req.params,
      { tag_id } = req.body,
      db = req.app.get('db')

    db.tags.untag_video({ id, tag_id })
    .then(tags => res.status(200).send(tags))
    .catch(err => res.status(500).send(err))
  },
  newTag: (req, res) => {
    const { id } = req.params,
      db = req.app.get('db')

    db.tags.new_tag({ id })
    .then(tags => res.status(200).send(tags))
    .catch(err => res.status(500).send(err))
  }
}