import React from 'react';
import ReactPlayer from 'react-player';
import { useSelector, useDispatch } from 'react-redux';
import { getVideo } from '../Redux/Reducers/reducer';

const VideoListItem = props => {
    const video = useSelector(state => state.video),
        dispatch = useDispatch()

    const selectVideo = () => {
        dispatch(getVideo(props.video))
    }
    return (
        <section className='video-listen'>
                <ReactPlayer url={props.video.video_url} 
                width='30vp'
                height='30vp'/>
            <button className='video-button' onClick={() => selectVideo()}> Watch </button>
        </section>
    )
}

export default VideoListItem;