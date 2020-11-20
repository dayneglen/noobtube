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
    [videoList, setVideoList] = useState([]),
    [videoTags, handleVideoTags] = useState([]);

  // console.log(comments)

  useEffect(() => {
    if (!user.email) {
      props.history.push("/");
    }
  }, [user, props.history]);

  useEffect(() => {
    getComments();
    getViews();
    getCreator();
    grabTags()
  }, [activeVideo]);

  useEffect(() => {
    getVideos()
    // console.log(videoTags)
  }, [videoTags])

  const getVideos = () => {
    axios
      .get(`/api/videos/tag/${activeVideo.video_id}`)
      .then(res => {
        let array = res.data
        let frequency = {}, value;

        for (let i = 0; i < array.length; i++) {
          let value = array[i].description
          if (value in frequency) {
            frequency[value]++
          } else {
            frequency[value] = 1
          }
        }

        let uniques = []
        for (value in frequency) {
          uniques.push(value)
        }

        function compareFrequency(a, b) {
          return frequency[b] - frequency[a];
        }
  
        let returnArray = uniques.sort(compareFrequency)
        returnArray.forEach((val, i) => {
          let obj = array.find(element => element.description === val)
          returnArray.splice(i, 1, obj)
        })
        returnArray.forEach((val, i) => {
          if (returnArray[i].video_id === activeVideo.video_id) {
            returnArray.splice(i, 1)
          }
        })
        setVideoList(returnArray)
      })
      .catch(err => console.log(err))
  };

  const grabTags = () => {
    axios.get(`/api/tags/${activeVideo.video_id}`)
    .then(res => handleVideoTags(res.data))
    .catch(err => console.log(err))
  }

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
      .then(() => {
        getComments()})
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
