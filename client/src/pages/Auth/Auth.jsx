import React from 'react'
import './Auth.css'
import Logo from '../../img/mainlogo.png'
const Auth = () => {
    return (
        <div className="Auth flex items-center justify-center min-h-screen gap-16 relative">
            <div className="a-left">
                <img src={Logo} alt="logo" style={{ width: '200px', height: 'auto' }} />
            </div>

            <SignUp />
            {/* <Login /> */}

        </div>
    )
}

function Login() {
    return (
        <div className="a-right">
            <form className="infoForm authForm flex flex-col justify-center items-center gap-8">
                <b><h4>Login</h4></b>
                <div>
                    <input type="text "
                        placeholder='username'
                        name="useName"
                        className="infoInput" />
                </div>
                <div>
                    <input type="email "
                        placeholder='email'
                        name="email"
                        className="infoInput" />
                </div>
                <div>
                    <input type="password "
                        placeholder='password'
                        name="password"
                        className="infoInput" />
                </div>
                <div>
                    <span style={{ fontSize: '18px' }}>Don't have an account. SignUp!</span>
                    <button className='button infoButtton' type='submit'>LogIn</button>
                </div>

            </form>
        </div>
    )
}

function SignUp() {
    return (
        <div className="a-right">
            <form className="infoForm authForm flex flex-col justify-center items-center gap-8">

                <b><h4>Sign Up</h4></b>
                <div>
                    <input type="text"
                        placeholder='FirstName'
                        className='infoInput'
                        name="firstname" />
                    <input type="text"
                        placeholder='LastName'
                        className='infoInput'
                        name="lasttname" />
                </div>

                <div>
                    <input type="text "
                        placeholder='username'
                        name="useName"
                        className="infoInput" />
                </div>
                <div>
                    <input type="email "
                        placeholder='email'
                        name="email"
                        className="infoInput" />
                </div>
                <div>
                    <input type="password "
                        placeholder='password'
                        name="password"
                        className="infoInput" />
                    <input type="password "
                        placeholder='Confirm Password'
                        name="confirmPassword"
                        className="infoInput" />
                </div>

                <div>
                    <span style={{ fontSize: '16px' }}>Already have an account. Login!</span>
                    <button className='button infoButtton' type='submit'>SignUp</button>
                </div>
                
            </form>
        </div>
    )
}

export default Auth
