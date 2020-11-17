import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { getVideo } from '../Redux/Reducers/reducer';
import axios from 'axios';

const VideoListItem = props => {
    // const video = useSelector(state => state.video);
    const [hover, setHover] = useState(false),
        dispatch = useDispatch()

    const selectVideo = () => {
        dispatch(getVideo(props.video))
    }

    const videoStyle = {
      cursor: 'pointer'
    }

  


    return (
      <section className="video-listen">
        <ReactPlayer
          url={props.video.video_url}
          playing={hover ? true : false}
          loop={true}
          volume="0"
          width="19.95vw"
          height="29.8vh"
          onClick={() => selectVideo()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <section className="video-info-section">
          <div className="profile-img-container">
            <img src={props.video.picture_url} alt='profile'/>
            <p>{props.video.username}</p>
          </div>
          <div className='dashboard-video-info'>
            <h2 className="video-title">{props.video.title}</h2>
            
            <p>Views: {props.video.views}</p>
          </div>
        </section>
      </section>
    );
}

export default VideoListItem;