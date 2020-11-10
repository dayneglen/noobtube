import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { clearUser } from '../Redux/Reducers/reducer';
import '../Styles/sideBar.scss'

class SideBar extends Component {
    handleLogout = () => {
        axios.get('/api/logout')
        .then(() => this.props.clearUser())
        .catch(err => console.log(err))
    }

    render(){
        return (
            <div className='sideBar-page'>
                <button onClick={() => this.handleLogout()} > Logout </button>
            </div>
        )
    }
}
const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, { clearUser })(withRouter(SideBar));