import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearVideo } from '../Redux/Reducers/reducer';
import Video from './Video';
import '../Styles/header.scss'

const Header = props => {
    const [search, handleSearch] = useState(''),
        dispatch = useDispatch()

    const toDash = () => {
        dispatch(clearVideo())
        props.history.push('/dash')
    }

    
            // let filteredVideo =this.props.Video.filter(
            //     (Video) =>{
            //         return Video.title.toLowerCase().indexOf(
            //             this.state.search.toLowerCase()) !== -1 ;
            //     }
            // );
        return (
            <div className='Header-page'>
               <button id='logo' onClick={() => toDash()}> <img src={`https://cdn.discordapp.com/attachments/775427056258777138/776118643510476810/noob_tube_2_by_xavgo2_d2ipfmw-pre.png`} alt="Noobtube" /> </button>
                <input
                type="text"
                value={search}
                onChange={e => handleSearch(e.target.value)}
                placeholder='Search'
                />
                <ul>
                    {/* {filteredVideo.map((video)=>{
                        return <Video video={video}
                                key={video.id} />
                    })} */}
                </ul>

            </div>
        )
    }


export default withRouter(Header);