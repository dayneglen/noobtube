import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearVideo } from "../Redux/Reducers/reducer";
import "../Styles/header.scss";
import { FaSearch } from "react-icons/fa";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar } from "@material-ui/core";
import logo from "./logo.png";





const Header = (props) => {
  const [search, handleSearch] = useState(""),
    dispatch = useDispatch();

  const toDash = () => {
    dispatch(clearVideo());
    props.history.push("/dash");
  };
  const toAccount = () => {
    dispatch(clearVideo());
    props.history.push("/account");
  };

  // let filteredVideo =this.props.Video.filter(
  //     (Video) =>{
  //         return Video.title.toLowerCase().indexOf(
  //             this.state.search.toLowerCase()) !== -1 ;
  //     }
  // );
  return (
    <div className='Header-page'>
      <img src={logo} alt="Noobtube" onClick={() => toDash()} />
      <div className='search-bar'>
      <input
        id='search'
        type="text"
        value={search}
        onChange={e => handleSearch(e.target.value)}
        placeholder='Search'
      /> 
      {/* <button id='search-button'>Search</button> */}
      <FaSearch id='search-button' />
      {/* <p id='p'>Tags</p> */}
      </div>
      <div className='header-icons'>
        <NotificationsIcon className='alert-icon'/>
        <Avatar onClick={() => toAccount()} className='avatar-icon'/>
      </div>
      <ul id='search-ul'>
        {/* {filteredVideo.map((video) => {
          return <Video video={video}
            key={video.id} />
        })} */}
      </ul>
    </div>
  );
};

export default withRouter(Header);
