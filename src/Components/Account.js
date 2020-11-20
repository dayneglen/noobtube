import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getUser, clearUser, getVideo } from '../Redux/Reducers/reducer';
import AccountVideo from './AccountVideo';
import PictureUpload from './PictureUpload';
import '../Styles/account.scss'

const Account = (props) => {
  const user = useSelector((state) => state.user),
    activeVideo = useSelector((state) => state.video),
    [username, handleUsername] = useState(user.username),
    [email, handleEmail] = useState(user.email),
    [editUsername, toggleEditUsername] = useState(false),
    [editEmail, toggleEditEmail] = useState(false),
    [deletingAccount, toggleDeletingAccount] = useState(false),
    [videos, handleVideos] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    if (!user.email) {
      props.history.push('/')
    // } else if (activeVideo.video_url) {
      // props.history.push('/video')
    } else {
      axios
        .get(`/api/user/videos/${user.user_id}`)
        .then((res) => handleVideos(res.data))
        .catch((err) => console.log(err));
    }
  }, [user, activeVideo, props.history]);

  useEffect(() => {
    // console.log(user)
    // console.log(videos)
    // console.log(activeVideo)
  }, [user, videos, activeVideo])

  const changeUsername = () => {
    axios
      .put(`/api/user/username/${user.user_id}`, { username })
      .then((res) => {
        const newUserObj = { ...user, username: res.data };
        dispatch(getUser(newUserObj));
      })
      .catch((err) => console.log(err));
    toggleEditUsername(!editUsername);
  };

  const changeEmail = () => {
    axios
      .put(`/api/user/email/${user.user_id}`, { email })
      .then((res) => {
        const newUserObj = { ...user, email: res.data };
        dispatch(getUser(newUserObj));
      })
      .catch();
    toggleEditEmail(!editEmail);
  };

  const deleteAccount = () => {
    axios
      .delete(`/api/user/${user.user_id}`)
      .then(() => {
        dispatch(clearUser());
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to delete account.  Please try again later.");
        toggleDeletingAccount(!deletingAccount);
      });
  };

  const deleteVideo = (video) => {
    axios
      .post(`/api/s3/deleteVideo/${video.video_id}`, {
        user_id: user.user_id,
        video_url: video.video_url,
      })
      .then((res) => handleVideos(res.data))
      .catch((err) => console.log(err));
  };

  const watchVideo = (videoObj) => {
    dispatch(getVideo(videoObj))
    props.history.push('/video')
  }

  const tagVideo = (videoObj) => {
    dispatch(getVideo(videoObj))
    props.history.push('/tags')
  }

  const mappedVideos = videos.map((video, i) => (
    <div className='account-video-display' key={i}>
      <AccountVideo video={video} user={user} deleteVideo={deleteVideo} watchVideo={watchVideo} tagVideo={tagVideo} />
    </div>
  ));

  return (
    <div className="account-page">
      <div className="account-box">
        <div className="account-container">
          {/* <div className="img-upload"> */}
          <div className="profile">
            <PictureUpload />
            <div className="user-info">
              {editUsername ? (
                <section>
                  <span>Username: </span>
                  <input
                    value={username}
                    onChange={(e) => handleUsername(e.target.value)}
                  />
                </section>
              ) : (
                <p>
                  {" "}
                  <span>Username </span>
                  {username}
                </p>
              )}
              {editEmail ? (
                <section>
                  <span>Email: </span>
                  <input
                    value={email}
                    onChange={(e) => handleEmail(e.target.value)}
                  />
                </section>
              ) : (
                <p>
                  {" "}
                  <span>Email Address </span>
                  {email}{" "}
                </p>
              )}
            </div>
          </div>
          {/* </div> */}
          <div className="username">
            {/* <div className="user-name"> Username </div> */}
            {editUsername ? (
              <section>
                <button
                  className="user-edit-btn"
                  onClick={() => {
                    toggleEditUsername(!editUsername);
                    handleUsername(user.username);
                  }}
                >
                  {" "}
                  Cancel{" "}
                </button>
                <button
                  className="user-edit-btn"
                  onClick={() => changeUsername()}
                >
                  {" "}
                  Submit{" "}
                </button>
              </section>
            ) : (
              <section>
                {/* <div> {username} </div> */}
                <button
                  className="btn-change"
                  onClick={() => toggleEditUsername(!editUsername)}
                >
                  {" "}
                  Change Username{" "}
                </button>
              </section>
            )}
          </div>
          <div className="email">
            {editEmail ? (
              <section>
                <button
                  className="user-edit-btn"
                  onClick={() => {
                    toggleEditEmail(!editEmail);
                    handleEmail(user.email);
                  }}
                >
                  {" "}
                  Cancel{" "}
                </button>
                <button className="user-edit-btn" onClick={() => changeEmail()}>
                  {" "}
                  Submit{" "}
                </button>
              </section>
            ) : (
              <section>
                {/* <div> {email} </div> */}
                <button
                  className="btn-change"
                  onClick={() => toggleEditEmail(!editEmail)}
                >
                  {" "}
                  Change Email Address{" "}
                </button>
              </section>
            )}
          </div>
          {deletingAccount ? (
            <section className="delete">
              <div className="desc">
                {" "}
                Are you sure you want to delete your account?{" "}
              </div>
              <button
                className="db"
                onClick={() => toggleDeletingAccount(!deletingAccount)}
              >
                {" "}
                On second thought...{" "}
              </button>
              <button className="db" onClick={() => deleteAccount()}>
                {" "}
                Yes{" "}
              </button>
            </section>
          ) : (
            <section className="delete">
              <button
                className="delete-button"
                onClick={() => toggleDeletingAccount(!deletingAccount)}
              >
                {" "}
                Delete Account{" "}
              </button>
            </section>
          )}
        </div>
      </div>
      <div className="my-videos">
        <p>If you have uploaded videos, you can edit them below</p>
        <div className="my" width="25vw" height="25vh">
          {mappedVideos}
        </div>
      </div>
    </div>
  );
};

export default Account;
