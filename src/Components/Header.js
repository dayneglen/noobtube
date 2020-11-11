import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Video from "./Video";
import "../Styles/header.scss";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
    };
  }
  updateSearch = (e) => {
    this.setState({
      search: e.target.value.substr(0, 10),
    });
  };

  toDash = () => {
    this.props.history.push("/dash");
  };

  render() {
    // let filteredVideo =this.props.Video.filter(
    //     (Video) =>{
    //         return Video.title.toLowerCase().indexOf(
    //             this.state.search.toLowerCase()) !== -1 ;
    //     }
    // );
    return (
      <div className="Header-page">
        <button id="logo" onClick={() => this.toDash()}>
          {" "}
          <img
            src={`https://cdn.discordapp.com/attachments/775427056258777138/776118643510476810/noob_tube_2_by_xavgo2_d2ipfmw-pre.png`}
            alt="Noobtube"
          />{" "}
        </button>
        <input
          placeholder="Search"
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
    );
  }
}

export default withRouter(Header);
