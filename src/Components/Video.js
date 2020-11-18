import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import VideoListItem from "./VideoListItem";
import Comment from "./Comment";
import axios from "axios";
import "../Styles/video.scss";
import LikeBar from "./LikeBar";

const Video = (props) => {
  const user = useSelector((state) => state.user);
  const activeVideo = useSelector((state) => state.video);
  const [comments, setComments] = useState([]),
    [comment, setComment] = useState([]),
    [creator, setCreator] = useState({}),
    [videoList, setVideoList] = useState([]);

  useEffect(() => {
    if (!user.email) {
      props.history.push("/");
    }
  }, [user, props.history]);

  useEffect(() => {
    getComments();
    getViews();
    getCreator();
    getVideos();
  }, [activeVideo]);

  const getVideos = () => {
    axios
      .get("/api/videos")
      .then((res) => {
        setVideoList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const videos = videoList.map((video, i) => {
    return <VideoListItem key={i} video={video} />;
  });

  const getComments = () => {
    axios
      .get(`/api/comments/${activeVideo.video_id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getViews = () => {
    axios
      .put(`/api/video/views/${activeVideo.video_id}`)
      .then()
      .catch((err) => console.log(err));
  };

  const getCreator = () => {
    axios
      .get(`/api/user/${activeVideo.user_id}`)
      .then((res) => {
        setCreator(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCommentEdit = (id, comment) => {
    axios
      .put(`/api/comment/${id}`, { comment })
      .then(() => {
        getComments();
      })
      .catch(err => console.log(err));
  };

  const handleCommentDelete = (id) => {
    axios
      .delete(`/api/comment/${id}`)
      .then(getComments())
      .catch((err) => console.log(err));
  };

  const commentsMapped = comments.map((commentInfo, i) => {
    return (
      <Comment
        key={i}
        commentInfo={commentInfo}
        deleteComment={handleCommentDelete}
        editComment={handleCommentEdit}
      />
    );
  });

  const handleAddComment = () => {
    axios
      .post("/api/comment", {
        video_id: activeVideo.video_id,
        user_id: user.user_id,
        comment: comment,
      })
      .then(() => {
        getComments();
        setComment("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="video-page">
      <section className="left-side">
        <div className="video">
          <ReactPlayer
            url={activeVideo.video_url}
            playing={true}
            controls={true}
          />
        </div>
        <div className="title-bar">
          <p>{activeVideo.title}</p>
          <p>Views: {activeVideo.views}</p>
        </div>
        <LikeBar />
        <div className="bio">
          <div>
            <div className="video-creator-info-section">
              <div className="video-img-container">
                <img src={creator.picture_url} alt="creator" />
              </div>
              <p className="creator-username">{creator.username}</p>
            </div>
            <p className="creator-subscribers">{activeVideo.description}</p>
          </div>
        </div>
        <div className="comments">
          <div className="my-comment">
            <input
              placeholder="Add comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button id="send" onClick={handleAddComment}>
              Comment
            </button>
          </div>
          <div className="other-comments">
            <div id="other">{commentsMapped}</div>
          </div>
        </div>
      </section>
      <section className="right-side">
        <div className="other-videos">{videos}</div>
      </section>
    </div>
  );
};

export default Video;
