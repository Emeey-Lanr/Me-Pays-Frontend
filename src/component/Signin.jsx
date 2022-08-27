import './login.css'
import Logo from './Logo'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const Signin = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [uservalid, setuservalid] = useState('')
    const endpoint = 'http://localhost:4141/user/signin'
    let userDetailsValidation = { email: email, password: password }
    const navigate = useNavigate('')
    const signinuser = () => {
        if (email === '' || password === '') {
            setuservalid('Forgot something, fill in details')
        } else {
            axios.post(endpoint, userDetailsValidation).then((result) => {
                if (result.data['status'] === true) {
                    navigate('/dashboard')
                } else {
                    setuservalid(result.data.message)
                }
            })
        }
    }
    return (
        <>
            <div className="signinbody">
                <div className='signinback'>
                    <div className='signinbodycon' >
                        <Logo />
                        <p className='signintext'>Sign In</p>
                        <div>
                            <div className='emailsignin'>
                                <p>Email</p>
                                <span><FaUserAlt /></span><input type="text" onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <div className='paswordsign'>
                                <p>Password</p>
                                <span><FaLock /> </span><input type="text" onChange={(e) => setpassword(e.target.value)} />
                            </div>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: "0.9rem", color: "red", padding: "5px 0" }}>{uservalid}</p>
                        <div className='signinbtn'>
                            <button onClick={() => signinuser()}>Sign In</button>
                        </div>
                        <p className='dont'> Don't have an account ?</p>
                        <div className='rodsignin'>
                            <div className='rodsignin1'></div>
                            <div>
                                <Link to='/signup' className='signuplink'>Signup</Link>
                            </div>
                            <div className='rodsignin2'></div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Signin