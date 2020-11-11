import React, { Component } from "react";
import "../Styles/admin.scss";
import Header from "./Header";

class Admin extends Component {
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
              <td> {this.handleViews}</td>
              <td> {this.handleLikes}</td>
              <td> {this.handleDislikes}</td>
              <td> {this.props.user.comment}</td>
              <td> {this.handleReport}</td>
              <td> {this.handleAction}</td>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default Admin;
