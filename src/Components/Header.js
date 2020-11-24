import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { clearVideo, getVideo } from "../Redux/Reducers/reducer";
import "../Styles/header.scss";
import { FaSearch } from "react-icons/fa";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar } from "@material-ui/core";
import logo from "./logo.png";


const Header = (props) => {
  const [search, setSearch] = useState(""),
    [videoList, setVideoList] = useState([]),
    [filteredVideos, setFilteredVideos] = useState([]),
    dispatch = useDispatch(),
    activeVideo = useSelector((state) => state.video),
    user = useSelector((state) => state.user);

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    setFilteredVideos(
      videoList.filter((video) => video.title.toLowerCase().includes(search))
    );
  }, [search, videoList]);

  const toDash = () => {
    dispatch(clearVideo());
    props.history.push("/dash");
  };
  const toAccount = () => {
    dispatch(clearVideo());
    props.history.push("/account");
  };

  const getVideos = () => {
    axios
      .get("/api/videos")
      .then((res) => {
        setVideoList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const selectVideo = video => {
    dispatch(getVideo(video));
    setSearch('');
    props.history.push('/video');
  };

  const searchResults = filteredVideos.map((video, i) => {
    return <li onClick={() => selectVideo(video)} key={i}>{video.title}</li>;
  });

  console.log(user)

  return (
    <div className="Header-page">
      <img src={logo} alt="Noobtube" onClick={() => toDash()} />
      <div className="search-bar-container">
        <div className="search-bar">
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <FaSearch id="search-button" />
        </div>
        <div
          className={
            search.length === 0 ? "search-hidden" : "search-results-container"
          }
        >
          <ul className="search-results">{searchResults}</ul>
        </div>
      </div>
      <div className="header-icons">
        <NotificationsIcon className="alert-icon" />
        <img
          className="header-account-pic"
          src={user.picture_url}
          alt="Account"
          onClick={toAccount}
        />
      </div>
    </div>
  );
};

export default withRouter(Header);
