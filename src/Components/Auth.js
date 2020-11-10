import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {getUser} from './../Redux/Reducers/reducer';

const Auth = (props) => {
  const [username, setUsername] = useState(''),
        [password, setPassword] = useState(''),
        [email, setEmail] = useState(''),
        [registerView, toggleRegisterView] = useState(false);

  const user = useSelector(state => state.user),
        dispatch = useDispatch()

  const handleRegister = () => {
    axios.post('/api/register', {username, email, password})
    .then(res => {
      dispatch(getUser(res.data))
    })
    .catch(err => console.log(err))
  }

  const handleLogin = () => {
    axios.post('/api/login', {email, password})
    .then(res => dispatch(getUser(res.data)))
    .catch(err => console.log(err))
  }

  return(
    <div className='auth-page'>
      <section>
        <section>
          <p> Email: </p>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </section>
        {registerView ? (
          <section>
            <p> Username: </p>
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </section>
        ) : null}
        <section>
          <p> Password: </p>
          <input value={password} onChange={e => setPassword(e.target.value)} />
        </section>
        {registerView ? (
          <section>
            <button onClick={() => handleRegister()}> Register </button>
            <p> Already have an account? </p>
            <button onClick={() => toggleRegisterView(!registerView)} > Login Here </button>
          </section>
        ) : (
          <section>
            <button onClick={() => handleLogin()}> Login </button>
            <p> Need an account? </p>
            <button onClick={() => toggleRegisterView(!registerView)} > Register Here </button>
          </section>
        )}
      </section>
    </div>
  )
}

export default Auth;