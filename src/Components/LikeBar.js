import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const LikeBar = (props) => {
  const user = useSelector((state) => state.user);
  const activeVideo = useSelector((state) => state.video);

  const [likes, setLikes] = useState(0),
    [liked, setLiked] = useState(false),
    [dislikes, setDislikes] = useState(0),
    [disliked, setDisliked] = useState(false),
    [subscribers, setSubscribers] = useState(0),
    [subscribed, setSubscribed] = useState(true);

  useEffect(() => {
    getLikes();
    getDislikes();
    getSubscribers();
  }, []);
  const getLikes = () => {
    axios
      .get(`/api/like/${activeVideo.video_id}`)
      .then((res) => {
        const foundLike = res.data.find((like) => {
          return like.user_id === user.user_id;
        });
        if (foundLike) {
          setLiked(true);
        }
        setLikes(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  const getDislikes = () => {
    axios
      .get(`/api/dislike/${activeVideo.video_id}`)
      .then((res) => {
        const foundDislike = res.data.find((disLike) => {
          return disLike.user_id === user.user_id;
        });
        if (foundDislike) {
          setDisliked(true);
        }
        setDislikes(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  const getSubscribers = () => {
    axios
      .get(`/api/subscription/${activeVideo.user_id}`)
      .then((res) => {
        const foundSubscriber = res.data.find((subscriber) => {
          return subscriber.subscriber === user.user_id;
        });
        if (foundSubscriber) {
          setSubscribed(true);
        }
        setSubscribers(res.data.length);
      })
      .catch((err) => console.log(err));
  };

  const handleLikeToggle = () => {
    axios
      .post("/api/likes", {
        video_id: activeVideo.video_id,
        user_id: user.user_id,
      })
      .then(() => {
        getLikes();
        getDislikes();
        setLiked(!liked);
        setDisliked(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDislikeToggle = () => {
    axios
      .post("/api/dislikes", {
        video_id: activeVideo.video_id,
        user_id: user.user_id,
      })
      .then(() => {
        getLikes();
        getDislikes();
        setDisliked(!disliked);
        setLiked(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSubscriptionToggle = () => {
    axios.post('/api/subscription', {subscriberId: user.user_id, creatorId: activeVideo.user_id}).then(() => {
      getSubscribers();
      setSubscribed(!subscribed);
    }).catch(err => console.log(err));
  }

  const likedStyle = {
    backgroundColor: "rgb(17, 45, 200)",
  };


  return (
    <div className="video-bar">
      <button
        id="like"
        onClick={handleLikeToggle}
        style={liked ? likedStyle : null}
      >
        <i className="fa fa-thumbs-up" aria-hidden="true">
          <p>{likes}</p>
        </i>
      </button>
      <button
        id="dislike"
        onClick={handleDislikeToggle}
        style={disliked ? likedStyle : null}
      >
        <i className="fa fa-thumbs-down" aria-hidden="true">
          <p>{dislikes}</p>
        </i>
      </button>
      <button id="Subscribe" onClick={handleSubscriptionToggle}>
        Subscribe {subscribers}
      </button>
    </div>
  );
};

export default LikeBar;
