import React, { Component } from "react";
import "../Styles/admin.scss";
import Header from "./Header";
import axios from "axios";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
    };
  }

  increment = () => {
    this.setState({ count: this.state.count - 1 });
  };
  increment = () => {
    this.setState({ count: this.state.count - 1 });
  };

  getVideos = () => {
    axios
      .get("/api/videos")
      .then((res) => {
        setVideoList(res.data);
      })
      .catch((err) => console.log(err));
  };

  handleAction = (id) => {
    axios
      .delete(`/api/video/${id}`)
      .then(() => {
        this.getVideos();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="admin-page">
        <Header />
        <section className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th> Video ID </th>
                <th>Title</th>
                <th>Description </th>
                <th>Video Link</th>
                <th>Views</th>
                <th>Likes</th>
                <th>dislikes</th>
                <th>Comments</th>
                <th>Video_reported</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <td> {this.props.user.username}</td>
              <td> {this.props.user.video_id} </td>
              <td> {this.props.video.title}</td>
              <td> {this.props.video.description}</td>
              <td> {this.props.video.video_url}</td>
              <td> {this.state.count}</td>
              <td> {this.state.count}</td>
              <td> {this.state.count}</td>
              <td> {this.props.user.comment}</td>
              <td> {this.state.count}</td>
              <td>
                <button onClick={this.handleAction}>Delete</button>
              </td>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default Admin;
