import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../Styles/account.scss'

const Account = props => {
    const user = useSelector(state => state.user),
        [username, handleUsername] = useState(user.username),
        [email, handleEmail] = useState(user.email),
        [editUsername, toggleEditUsername] = useState(false),
        [editEmail, toggleEditEmail] = useState(false);

    useEffect(() => {
        if(!user.email){
          props.history.push('/')
        }
      }, [user, props.history])

    useEffect(() => {
      console.log(user)
    }, [user])

    const changeUsername = () => {

    }

    const changeEmail = () => {

    }

    return (
        <div className='account-page'>
          <div className='account-box'>
            <div className='username'>
               <p> Username: </p> 
               {editUsername
               ? (<section>
                   <input value={username} onChange={e => handleUsername(e.target.value)} />
                   <button onClick={() => {
                     toggleEditUsername(!editUsername)
                     handleUsername(user.username)
                  }}> Cancel </button>
                    <button onClick={() => changeUsername()}> Submit </button>
                 </section>)
              : (<section>
                  <p> {username} </p>
                  <button onClick={() => toggleEditUsername(!editUsername)}> Change Username </button>
                </section>)
              }
            <div className='email'>
              <p> Email: </p>
              {editEmail
              ? (<section>
                  <input value={email} onChange={e => handleEmail(e.target.value)} />
                  <button onClick={() => {
                    toggleEditEmail(!editEmail)
                    handleEmail(user.email)
                    }}> Cancel </button>
                    <button onClick={() => changeEmail()}> Submit </button>
                </section>)
              : (<section>
                  <p> {email} </p>
                  <button onClick={() => toggleEditEmail(!editEmail)}> Change Email Address </button>
                </section>)
            }
            </div>    
            </div>
          </div>
        </div>
    )
}

export default (Account);