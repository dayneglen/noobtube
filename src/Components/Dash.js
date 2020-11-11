import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../Styles/dash.scss'

const Dash = props => {
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(!user.email){
          props.history.push('/')
        }
      }, [user, props.history])

        return (
            <div className='Dash-page'>
                <div className='dash-videos'>

                </div>
            </div>
        )
    }

export default (Dash);