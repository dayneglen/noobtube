import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getUser } from './../Redux/Reducers/reducer';
import "../Styles/auth.scss";

const Auth = (props) => {
  const [username, setUsername] = useState(''),
    [password, setPassword] = useState(''),
    [email, setEmail] = useState(''),
    [registerView, toggleRegisterView] = useState(false);

  const user = useSelector(state => state.user),
    dispatch = useDispatch()

  const handleRegister = () => {
    axios.post('/api/register', { username, email, password })
      .then(res => {
        dispatch(getUser(res.data))
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if(user.is_admin){
      props.history.push('/admin')
     }else if(user.email){
      props.history.push('/dash')
    }
  }, [user, props.history])

  const handleLogin = () => {
    axios.post('/api/login', { email, password })
      .then(res => dispatch(getUser(res.data)))
      .catch(err => console.log(err))
  }

  return (
    <div className='auth-page'>
      <section className='login-box'>
        <div className='log'>
          {/* <p>Welcome to NoobTube</p> */}
          <section id='email'>
            <p> Email: </p>
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </section>
          {registerView ? (
            <section id='username'>
              <p> Username: </p>
              <input value={username} onChange={e => setUsername(e.target.value)} />
            </section>
          ) : null}
          <section id='password'>
            <p> Password: </p>
            <input value={password} onChange={e => setPassword(e.target.value)} />
          </section>
          {registerView ? (
            <section className='register'>
              <button onClick={() => handleRegister()}> Register </button>
              <p> Already have an account? </p>
              <button onClick={() => toggleRegisterView(!registerView)} > Login Here </button>
            </section>
          ) : (
              <section className='register'>
                <button onClick={() => handleLogin()}> Login </button>
                <p> Need an account? </p>
                <button onClick={() => toggleRegisterView(!registerView)} > Register Here </button>
              </section>
            )}
        </div>
      </section>
    </div>
  )
}

export default Auth;