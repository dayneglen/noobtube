import React, { Component } from "react";
import "../Styles/admin.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, getVideo } from "../Redux/Reducers/reducer";
import ReactPlayer from "react-player";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      videos: [],
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
      .then((res) => this.setState({ videos: res.data }))
      .catch((err) => console.log(err));
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  increment = () => {
    this.setState({ count: this.state.count - 1 });
  };

  handleAction = (id) => {
    axios
      .delete(`/api/video/${id}`)
      .then(() => {
        this.props.getVideo();
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state.videos);
    const mappedVideos = this.state.videos.map((video, i) => (
      <div key={i} className="admin-page">

<table>
            <thead>
              <tr>
                <th>Username</th>
                <th> Video_id </th>
                <th>Title</th>
                <th>Description </th>
                <th>Video </th>
                <th>Views</th>
                <th>Likes</th>
                <th>dislikes</th>
                <th>Comments</th>
                <th>Video_reported</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td> {video.user_id}</td>
                <td>{video.video_id}</td>
                <td> {video.title}</td>
                <td> {video.description}</td>
                <td> <ReactPlayer url={video.video_url} className="video-preview" /></td>
                <td> {this.state.count}</td>
                <td> {this.state.count}</td>
                <td> {this.state.count}</td>
                <td> comment</td>
                <td> {this.state.count}</td>
                <td><button onClick={() => this.handleAction(video.video_id)}>Delete</button></td>
              </tr>
            </tbody>
          </table>
      </div>
    ));

    return (
      <div >{mappedVideos}</div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, { getUser, getVideo })(Admin);
