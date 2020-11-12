import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import VideoListItem from "./VideoListItem";
import { clearVideo } from "../Redux/Reducers/reducer";
import "../Styles/dash.scss";
import Header from "./Header";

const Dash = (props) => {
  const user = useSelector((state) => state.user),
    activeVideo = useSelector((state) => state.video),
    dispatch = useDispatch(),
    [videoList, setVideoList] = useState([]);

  useEffect(() => {
    if (!user.email) {
      props.history.push("/");
    } else if (activeVideo.video_url) {
      props.history.push("/video");
    }
  }, [user, activeVideo, props.history]);

  useEffect(() => {
    getVideos();
    dispatch(clearVideo());
  }, []);

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

  return (
    <div className='Dash-page'>
        <div className='dash-videos'>
          {videos}
        </div>
    </div>
)
};

export default (Dash);
