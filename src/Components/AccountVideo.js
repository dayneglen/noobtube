import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideo } from ".././Redux/Reducers/reducer";
import ReactPlayer from "react-player";
import axios from "axios";

const AccountVideo = (props) => {
  const [editTitle, toggleEditTitle] = useState(false),
    [editDescription, toggleEditDescription] = useState(false),
    { video, user } = props,
    [description, handleDescription] = useState(video.description),
    [title, handleTitle] = useState(video.title),
    [deleting, toggleDeleting] = useState(false),
    dispatch = useDispatch();

  const selectVideo = (id) => {
    dispatch(getVideo(id));
  };

  const submitChange = () => {
    axios
      .put(`/api/video/${video.video_id}`, { title, description })
      .then(() => {
        toggleEditDescription(false);
        toggleEditTitle(false);
      })
      .catch((err) => console.log(err));
  };

  const cancelTitle = () => {
    handleTitle(video.title);
    toggleEditTitle(false);
  };

  const cancelDescription = () => {
    handleDescription(video.description);
    toggleEditDescription(false);
  };

  return (
    <div className="account-video">
      <section className="edit-video-sections">
        {editTitle ? (
          <input value={title} onChange={(e) => handleTitle(e.target.value)} />
        ) : (
          <p className="title"> {title} </p>
        )}
        {editTitle ? (
          <section>
            <button onClick={() => cancelTitle()}> Cancel </button>
            <button onClick={() => submitChange()}> Submit </button>
          </section>
        ) : (
          <section>
            <button onClick={() => toggleEditTitle(!editTitle)}>
              {" "}
              Change Title{" "}
            </button>
          </section>
        )}
      </section>
      <ReactPlayer
        url={video.video_url}
        onClick={() => props.watchVideo(video)}
      />
      <button onClick={() => props.tagVideo(video)}> Change Tags </button>
      <section className='edit-video-sections'>
        {editDescription ? (
          <input
            value={description}
            onChange={(e) => handleDescription(e.target.value)}
          />
        ) : (
          <p> {description} </p>
        )}
        {editDescription ? <section className='video-edit-btn'>
          <button onClick={() => cancelDescription()}> Cancel </button>
          <button className='video-description-btn' onClick={() => submitChange()}> Submit </button>
        </section> : <section>
          <button className='video-edit-btn' onClick={() => toggleEditDescription(!editDescription)}>
            {" "}
            Change Description{" "}
          </button>
        </section>}
      </section>
      {deleting ? (
        <section>
          <p> Are you sure you want to delete this video? </p>
          <button onClick={() => toggleDeleting(false)}> Cancel </button>
          <button
            onClick={() => {
              props.deleteVideo(video);
              toggleDeleting(false);
            }}
          >
            {" "}
            Delete{" "}
          </button>
        </section>
      ) : (
        <section>
          <button onClick={() => toggleDeleting(true)}> Delete Video </button>
        </section>
      )}
    </div>
  );
};

export default AccountVideo;
