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
          <div className='account-box'>
            <div className='username'>
               username
              <input placeholder='Change Username here'/>
            <div className='email'>
              email
              <input placeholder='Change Email here'/>
            </div>    
            </div>
          </div>
        </div>
    )
}

export default (Account);