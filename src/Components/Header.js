import React, { Component } from 'react';
import '../Styles/header.scss'
// import { Link } from "react-router-dom";


class Header extends Component {
    constructor(){
        super();
        this.state ={
            search:''
        }
    }
    updateSearch = (e) => {
        this.setState({
            search: e.target.value.substr(0, 10)});
    }

    render() {
            // let filteredVideo =this.props.Video.filter(
            //     (video) =>{
            //         return Video.title.toLowerCase().indexOf(
            //             this.state.search.toLowerCase()) !== -1 ;
            //     }
            // );
        return (
            <div className='Header-page'>
               {/* <Link to="/dash"> <img src={logo} alt="Noobtube" /> </Link> */}
                <input
                type="text"
                value={this.state.search}
                onChange={this.updateSearch}
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
}

export default (Header);