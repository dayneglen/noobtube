import React, { Component } from "react";
import "../Styles/admin.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, getVideo } from "../Redux/Reducers/reducer";
import AdminVideo from './AdminVideo';


class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'',
      videos: [],
      comments: [],
      username: "",
      likes: 0,
      dislikes: 0
    };
  }
  componentDidMount() {
    this.getVideos();
    if (!this.props.user.email) {
      this.props.history.push("/");
    }
  }

  getVideos = () => {
    axios
      .get(`/api/videos`)
      .then((res) => {
        this.setState({ videos: res.data });
        this.getComments();
      })
      .catch((err) => console.log(err));
  };

  deleteVideo = (id) => {
    axios
      .post(`/api/s3/deleteVideo/${id}`)
      .then(() => {
        this.getVideos();
      })
      .catch((err) => console.log(err));
  };

getComments = () => {
  axios
     .get(`/api/comments/${this.state.videos[0].video_id}`)
     .then((res) => {
       this.setState({ comments: res.data });
     })
     .catch((err) => console.log(err));
};

  deleteComment = (id) => {
    axios
      .delete(`/api/comment/${id}`)
      .then(() => {
        this.getComments();
      })
      .catch((err) => console.log(err));
  };


  render() {
    
  
    const mappedVideos = this.state.videos.map((video, i) => (
      <AdminVideo key={i} video={video} />
    ));

    return <div>{mappedVideos}</div>;
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, { getUser, getVideo })(Admin);
