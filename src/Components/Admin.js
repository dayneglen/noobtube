import React, { Component } from "react";
import "../Styles/admin.scss";
import axios from "axios";
import { connect } from "react-redux";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

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
        this.props.getVideos();
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="admin-page">
        <section className="admin-table">
          <h1>ADMIN PORTAL</h1>
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
              <td> Username1</td>
              <td>Video ID 1 </td>
              <td> Title 1</td>
              <td> description 1</td>
              <td> video_url 1</td>
              <td> {this.state.count}</td>
              <td> {this.state.count}</td>
              <td> {this.state.count}</td>
              <td> comment</td>
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

export default connect((state) => state, {})(Admin);
