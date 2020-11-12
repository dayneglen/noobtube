import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getUser, clearUser } from '../Redux/Reducers/reducer';
import '../Styles/account.scss'

const Account = props => {
    const user = useSelector(state => state.user),
        [username, handleUsername] = useState(user.username),
        [email, handleEmail] = useState(user.email),
        [editUsername, toggleEditUsername] = useState(false),
        [editEmail, toggleEditEmail] = useState(false),
        [deletingAccount, toggleDeletingAccount] = useState(false),
        dispatch = useDispatch();

    useEffect(() => {
        if(!user.email){
          props.history.push('/')
        }
      }, [user, props.history])

    useEffect(() => {
      console.log(user)
    }, [user])

    const changeUsername = () => {
      axios.put(`/api/user/username/${user.user_id}`, { username })
      .then(res => {
        const newUserObj = {...user, username: res.data}
        dispatch(getUser(newUserObj))
      })
      .catch(err => console.log(err))
      toggleEditUsername(!editUsername)
    }

    const changeEmail = () => {
      axios.put(`/api/user/email/${user.user_id}`, { email })
      .then(res => {
        const newUserObj = {...user, email: res.data}
        dispatch(getUser(newUserObj))
      })
      .catch()
      toggleEditEmail(!editEmail)
    }

    const deleteAccount = () => {
      axios.delete(`/api/user/${user.user_id}`)
      .then(() => {
        dispatch(clearUser())
      })
      .catch(err => {
        console.log(err)
        alert('Unable to delete account.  Please try again later.')
        toggleDeletingAccount(!deletingAccount)
      })
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
            </div>
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
          {deletingAccount ? (
            <section>
              <p> Are you sure you want to delete your account? </p>
              <button onClick={() => toggleDeletingAccount(!deletingAccount)}> On second thought... </button>
              <button onClick={() => deleteAccount()}> Yes </button>
            </section>
          ) : (
            <section>
              <button onClick={() => toggleDeletingAccount(!deletingAccount)}> delete Account </button>
            </section>
          )}   
        </div>
      </div>
    )
}

export default (Account);