import React from 'react';
import ReactPlayer from 'react-player';
const VideoListItem = props => {
    // console.log(props.video.video)
    return (
        <section>
            <ReactPlayer url={props.video.video_url}/>
        </section>
    )
}

export default VideoListItem;