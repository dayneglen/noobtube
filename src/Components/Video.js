import React, { Component } from 'react';
import '../Styles/video.scss'

class Video extends Component {
    render() {
        return (
            <div className='video-page'>
                <section className='left-side'>
                    <div className='video'></div>
                    <div className='video-bar'>
                        <button id='like'>Like</button>
                        <button id='dislike'>Dislike</button>
                        <button id='Subscribe'>Subscribe</button>
                    </div>
                    <div className='comments'>
                        <div className='my-comment'>
                            <input placeholder='Add comment here...'/>\
                            <button id='send'>Comment</button>
                        </div>
                        <div className='other-comments'>
                            {/* {this.props.comments} */}
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
}

export default (Video);