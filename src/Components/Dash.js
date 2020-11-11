import React, { Component } from 'react';
import '../Styles/dash.scss'
import Header from './Header'

class Dash extends Component {
    render() {
        return (
            <div className='Dash-page'>
                <div className='dash-videos'>
                    <Header/>

                </div>
            </div>
        )
    }
}

export default (Dash);