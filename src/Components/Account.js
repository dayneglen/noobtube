import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../Styles/account.scss'

const Account = props => {
    const user = useSelector(state => state.user)

    useEffect(() => {
        if(!user.email){
          props.history.push('/')
        }
      }, [user, props.history])

    return (
        <div className='account-page'>

        </div>
    )
}

export default (Account);