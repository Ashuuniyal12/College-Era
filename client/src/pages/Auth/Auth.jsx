import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/mainlogo.png'
import {useDispatch, useSelector} from 'react-redux' 
import { signUp , logIn} from '../../actions/AuthAction'

const Auth = () => {

    let error = true;
    const [isSignUp, setIsSignUp] = useState(true);

    const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '', username: '' });

    const [confirmPass , setConfirmPass] = useState(true);

    const dispatch = useDispatch();
    
    const loading  = useSelector((state) => state.authReducer.loading);
    const msg= useSelector((state) => state.authReducer.msg);

    const onSignUpChange = () => {
        setIsSignUp(!isSignUp)
        resetForm()
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmitChange = (e) => {
        e.preventDefault();
        // console.log(data)
        if(isSignUp){
            data.password === data.confirmpassword ? dispatch(signUp(data)) : setConfirmPass(false)
          
        }else{
            dispatch(logIn(data))
            if(msg.message === 'OK'){
                error = false
            }
            else{
                error = true
                resetForm()
            }
        }
        
    }

    const resetForm = () => {
        setConfirmPass(true);
        setData({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '', username: '' })
    }

    return (
        <div className="Auth flex items-center justify-center min-h-screen gap-16 relative">
            {/* Left Side */}

            <div className="a-left">
                <img src={Logo} alt="logo" style={{ width: '200px', height: 'auto' }} />
            </div>

            {/* Right Side  */}
            <div className="a-right">
                <form className="infoForm authForm flex flex-col justify-center items-center gap-8" onSubmit={handleSubmitChange}>

                    <b><h4>{isSignUp ? 'Sign Up' : 'Log In'}</h4></b>
<<<<<<< HEAD

                    {/* {error && !isSignUp && <p className="text-red-500">{msg.message}</p>} */}
=======
                   { console.log("message ", msg)}
                    {error && !isSignUp && <p className="text-red-500">{msg.message}</p>}
>>>>>>> 84eedbbcc977f3c4035ef6376cb059b592c45de2

                    {isSignUp &&
                        <div>
                            <input type="text"
                                placeholder='FirstName'
                                className='infoInput'
                                name="firstname"
                                value={data.firstname}
                                onChange={handleChange} />
                            <input type="text"
                                placeholder='LastName'
                                className='infoInput'
                                name="lastname"
                                value={data.lastname}
                                onChange={handleChange} />
                        </div>
                    }


                    <div>
                        <input type="text "
                            placeholder='username'
                            name="username"
                            className="infoInput"
                            value={data.username}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input type="email "
                            placeholder='email'
                            name="email"
                            className="infoInput"
                            value={data.email}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <input type="password"
                            placeholder='password'
                            name="password"
                            className="infoInput"
                            value={data.password}
                            onChange={handleChange}
                        />

                        {isSignUp &&
                            <input type="password"
                                placeholder='Confirm Password'
                                name="confirmpassword"
                                className="infoInput"
                                value={data.confirmpassword}
                                onChange={handleChange} />
                        }

                    </div>
                    <span className = 'self-end mr-1 text-sm' style = {{display : confirmPass ? "none" : "block" , color :'red'}}>
                        * Confirm Password must be same as Password
                    </span>

                    <div>
                        <span style={{ fontSize: '16px', cursor: 'pointer' }}
                            onClick={onSignUpChange}>{isSignUp ? 'Already have an account. Login!' : "Don't have an Account SignUp"}
                        </span>
                        <button className='button infoButtton' disabled= {loading} type='submit'>{loading? "loading...":isSignUp ? 'SignUp' : 'LogIn'}</button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Auth
