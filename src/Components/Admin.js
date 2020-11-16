import React, { Component } from "react";
import "../Styles/admin.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, getVideo } from "../Redux/Reducers/reducer";
import ReactPlayer from "react-player";
import { FaTrashAlt } from "react-icons/fa";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      comments: [],
      username: "",
      videoReportedCounter: 0,
      views: 0,
      likes: 0,
      dislikes: 0,
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
    axios.post(`/api/s3/deleteVideo/${id}`)
      .then(res => this.setState({videos: res.data}))
      .catch(err => console.log(err))
  };

  getComments = () => {
    
    axios
      .get(`/api/comments/${this.state.videos[0].video_id}`)
      .then((res) => {
        this.setState({ comments: res.data })
      console.log(res.data)
      })
      .catch((err) => console.log(err));
  };
  deleteComment = (id) => {
    console.log(id)
    axios
      .delete(`/api/comment/${id}`)
      .then(() => {
        this.getComments();
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.comments)
    const commentsMapped = this.state.comments.map((commentInfo, i) => (
      <div  key={i}>
        <p>Username: {commentInfo.username}</p>
        <p className="admin-comments-box">
          {commentInfo.comment}
        <FaTrashAlt onClick={() => this.deleteComment(commentInfo.comment_id)} />
        </p>
      </div>
    ));

    const mappedVideos = this.state.videos.map((video, i) => (
      <div key={i} className="admin-page">
        <table className="flex-table">
          <thead>
            <tr>
              <th>user_id</th>
              <th> Video_id </th>
              <th>Title</th>
              <th>Description </th>
              <th>Video </th>
              <th>Views</th>
              <th>Likes</th>
              <th>dislikes</th>
              <th>Comments</th>
              <th>Video_reported</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td> {video.user_id} </td>
              <td>{video.video_id} </td>
              <td>{video.title}</td>
              <td>{video.description} </td>
              <td>
                <FaTrashAlt onClick={() => this.deleteVideo(video.user_id)} />
                <ReactPlayer className="preview" url={video.video_url} />
              </td>
              <td> {this.state.views}</td>
              <td> {this.state.likes}</td>
              <td> {this.state.dislikes}</td>
              <td>
                {commentsMapped}
              </td>
              <td> {this.state.videoReportedCounter}</td>
            </tr>
          </tbody>
        </table>
      </div>
    ));

    return <div>
              {mappedVideos}    
            </div>;
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, { getUser, getVideo })(Admin);
