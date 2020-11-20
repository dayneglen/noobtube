import React, {useEffect, useState} from 'react';
import ReactPlayer from "react-player";
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';

const AdminVideo = props => {
    const { video } = props;
    const [likes, setLikes] = useState(0),
          [dislikes, setDislikes] = useState(0),
          [comments, setComments] = useState([]);

    useEffect(() => {
        getLikes();
        getDislikes();
        getComments();
    }, []);

    const getLikes = () => {
      axios
        .get(`/api/like/${video.video_id}`)
        .then((res) => {
         
          setLikes(res.data.length);
        })
        .catch((err) => console.log(err));
    };

    const getDislikes = () => {
      axios
        .get(`/api/dislike/${video.video_id}`)
        .then((res) => {
          setDislikes(res.data.length);
        })
        .catch((err) => console.log(err));
    };

    const getComments = () => {
      axios
        .get(`/api/comments/${video.video_id}`)
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => console.log(err));
    };


    const commentsMapped = comments.map((commentInfo, i) => (
      <div key={i}>
        <p>Username: {commentInfo.username}</p>
        <p className="admin-comments-box">
          {commentInfo.comment}
          <FaTrashAlt
            className=" icon-delete"
            onClick={() => this.deleteComment(commentInfo.comment_id)}
          />
        </p>
      </div>
    ));

     
    return (
      <div className="admin-page">
        <table className="flex-table">
          <thead>
            <tr>
              <th>user_name</th>
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
              <td> {video.username} </td>
              <td>{video.video_id} </td>
              <td className="title-table">{video.title}</td>
              <td className="description-table">{video.description} </td>
              <td className="video-table">
                <FaTrashAlt onClick={() => this.deleteVideo(video.video)} />
                <ReactPlayer className="preview" url={video.video_url} />
              </td>
              <td> {video.views}</td>
              <td>{likes}</td>
              <td>{dislikes}</td>
              <td>{commentsMapped}</td>
              <td> 0</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default AdminVideo;