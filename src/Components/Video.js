import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../Styles/video.scss'

const Video = props => {
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(!user.email){
          props.history.push('/')
        }
      }, [user, props.history])

    return (
        <div className='video-page'>
            <section className='left-side'>
                <div className='video'></div>
                <div className='video-bar'>
                    <button id='like'>Like</button>
                    <button id='dislike'>Dislike</button>
                    <button id='Subscribe'>Subscribe</button>
                </div>
                <div className='bio'>video info</div>
                <div className='comments'>
                    <div className='my-comment'>
                        <input placeholder='Add comment here...' />
                        <button id='send'>Comment</button>
                    </div>
                    <div className='other-comments'>
                        {/* {this.props.comments} */}Previous comments go here 
                    </div>
                </div>
            </section>
            <section className='right-side'>
                <div className='other-videos'>
                    {/* {this.props.videos} */}
                </div>
            </section>

        </div>
    )
}

export default (Video);