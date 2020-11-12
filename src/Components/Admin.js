import React, { Component } from "react";
import "../Styles/admin.scss";
import axios from "axios";
import { connect } from "react-redux";
import { getUser , getVideo} from '../Redux/Reducers/reducer';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      videos: []
    };
  }
  componentDidMount(){
    // if (!this.props.user.email){
    //   this.props.history.push('/')
    // }
  }

  getVideos = () => {
    axios
      .get(`/api/videos/${this.props.user.user_id}`)
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
        this.props.getVideos();
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.props)
    const mappedVideos =this.state.videos.map((video, i) =>(
      <div className='video-box'>
      <img key={i} src={video.video_url} alt='noobtube video' className='video-preview'/>
      <button onClick={() => this.handleAction(video.video_id)}>Delete</button>
  </div>
))
    return (
      
      <div className="admin-page">
        <section className="admin-table">
          <h1>ADMIN PORTAL</h1>
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
                <td> Username1</td>
                <td>Video ID 1 </td>
                <td> Title 1</td>
                <td> description 1</td>
                <td> {mappedVideos}</td>
                <td> {this.state.count}</td>
                <td> {this.state.count}</td>
                <td> {this.state.count}</td>
                <td> comment</td>
                <td> {this.state.count}</td>
                <td>
                  <button onClick={this.handleAction}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState;
};

export default connect(mapStateToProps, {getUser, getVideo})(Admin);
