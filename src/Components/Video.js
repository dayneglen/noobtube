import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import axios from 'axios';
import LikeBar from './LikeBar';
import '../Styles/video.scss'

const Video = props => {
  const user = useSelector(state => state.user)
  const activeVideo = useSelector(state => state.video)

  const [comments, setComments] = useState([]),
    [comment, setComment] = useState([]);


  useEffect(() => {
    if (!user.email) {
      props.history.push('/')
    }
  }, [user, props.history])

  useEffect(() => {
    getComments();
  }, []);

  const commentsMapped = comments.map((commentInfo, i) => {
    return (
      <section key={i}>
        <p>{commentInfo.username}</p>
        <p>{commentInfo.comment}</p>
      </section>
    )
  })

  const getComments = () => {
    axios
      .get(`/api/comments/${activeVideo.video_id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }


  const handleAddComment = () => {
    axios.post('/api/comment', { video_id: activeVideo.video_id, user_id: user.user_id, comment: comment }).then(() => {
      getComments();
      setComment('');
    }).catch(err => console.log(err))
  }

  return (
    <div className="video-page">
      <section className="left-side">
        <div className="video">
          <ReactPlayer url={activeVideo.video_url} controls={true} />
        </div>
        <div className='title-bar'>
          <p>{activeVideo.title}</p>
          <p></p>
        </div>
        <LikeBar />
        <div className="bio">video info</div>
        <div className="comments">
          <div className="my-comment">
            <input placeholder="Add comment here..." value={comment} onChange={e => setComment(e.target.value)} />
            <button id="send" onClick={handleAddComment}>Comment</button>
          </div>
          <div className="other-comments">
            <div id='other'>{commentsMapped}</div>
          </div>
        </div>
      </section>
      <section className="right-side">
        <div className="other-videos">{/* {this.props.videos} */}</div>
      </section>
    </div>
  );
}

export default (Video);