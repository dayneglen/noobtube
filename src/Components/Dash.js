import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import VideoListItem from './VideoListItem';
import '../Styles/dash.scss'

const Dash = props => {
    const user = useSelector(state => state.user),
          [videoList, setVideoList] = useState([]);

    useEffect(() => {
        if(!user.email){
          props.history.push('/')
        }
      }, [user, props.history])

    useEffect(() => {
      getVideos();
    }, [])

    const getVideos = () => {
      axios.get('/api/videos').then(res => {
        setVideoList(res.data);
      }).catch(err => console.log(err))
    }

    const videos = videoList.map((video, i) => {
      return (
        <VideoListItem key={i} video={video} />
      )
    })

        return (
            <div className='Dash-page'>
                <div className='dash-videos'>
                  {videos}
                </div>
            </div>
        )
    }

export default (Dash);