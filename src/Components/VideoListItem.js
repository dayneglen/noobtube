import React, {useState} from 'react';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { getVideo } from '../Redux/Reducers/reducer';

const VideoListItem = props => {
    // const video = useSelector(state => state.video);
    const     [hover, setHover] = useState(false),
        dispatch = useDispatch()

    const selectVideo = () => {
        dispatch(getVideo(props.video))
    }
    return (
      <section className="video-listen">
        <ReactPlayer
          url={props.video.video_url}
          playing={hover ? true : false}
          loop={true}
          volume="0"
          width="20vw"
          height="29.8vh"
          onClick={() => selectVideo()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          
        />
        <div className="video-title">{props.video.title}</div>
      </section>
    );
}

export default VideoListItem;