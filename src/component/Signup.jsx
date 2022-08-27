import './login.css'
import Logo from './Logo'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Result } from 'postcss'
const Signup = ({ setuderid }) => {
    const phoneregex = /^[\d]{11}$/
    const mailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const [firstName, setFirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setemail] = useState('')
    const [phonenumber, setphonenumber] = useState('')
    const [password, setpassword] = useState('')
    const [passwordValidation, setpasswordValidation] = useState('')
    const [phonevalidation, setPhoneValidation] = useState('')
    const [mailvalidation, setmailvalidation] = useState('')
    const [btndisable, setbtndisable] = useState(false)
    const [emptyinput, setemptyinput] = useState('')
    //emailvalidation
    const yourmail = (e) => {
        if (mailregex.test(e.target.value)) {
            setbtndisable(false)
            setemail(e.target.value)
            setmailvalidation('')
        } else {
            setbtndisable(true)
            setmailvalidation('Invalid email')
        }
    }
    //Password Validation
    const passw = (e) => {
        if (e.target.value.trim().length < 6) {
            setpasswordValidation('password must be a least 6 characters')
            setbtndisable(true)
        } else {
            setpasswordValidation('')
            setpassword(e.target.value)
            setbtndisable(false)
        }
    }
    //Phone number validation
    const phone = (e) => {

        if (phoneregex.test(e.target.value)) {
            setPhoneValidation('')
            setphonenumber(e.target.value)
            setbtndisable(false)
        } else {
            setPhoneValidation('Invalid phone number')
            setbtndisable(true)
        }
    }
    const endpoint = 'http://localhost:4141/user/signup'
    //navigation 
    let navigate = useNavigate()
    let user = { firstName: firstName, lastName: lastName, email: email, phoneNumber: phonenumber, password: password, imgUrl: '' }
    const signupAcc = () => {

        if (firstName === '' || lastName === '' || email === '' || phonenumber === '' || password === '') {
            setemptyinput('Looks like you forgot something')
        } else {
            axios.post(endpoint, user).then((result) => {
                if (result.data['status'] !== true) {
                    setmailvalidation('Email Already Exist')

                } else {
                    navigate('/dashboard')
                }

            })
        }
    }
    return (
        <>
            <div className="signupbody">
                <div className='back'>
                    <div className='signup'>
                        <div>
                            <div className='logo'>
                                <Logo />
                            </div>
                            <h4>Create An Account</h4>
                            <p style={{ textAlign: "center", fontSize: '0.8rem', color: 'red' }}>{emptyinput}</p>
                            <div className='inputsect'>
                                <p>FirstName</p>
                                <div>
                                    <span><FaUserAlt /> </span>  <input type="text" onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <p>Last Name</p>
                                <div>
                                    <span></span> <input type="text" onChange={(e) => setlastName(e.target.value)} />
                                </div>
                                <p>Email</p>
                                <div>
                                    <span></span><input type="text" onChange={(e) => yourmail(e)} />
                                </div>
                                <p style={{ color: 'red', fontSize: "0.8rem" }}>{mailvalidation}</p>
                                <p>Phone Number</p>
                                <div>
                                    <span></span> <input type="text" onChange={(e) => phone(e)} />
                                </div>
                                <p style={{ color: 'red', fontSize: "0.8rem" }}>{phonevalidation}</p>
                                <p>Password</p>
                                <div>
                                    <span></span> <input type="text" onChange={(e) => passw(e)} />
                                </div>
                                <p className='passval' style={{ color: 'red', fontSize: "0.8rem" }}>{passwordValidation}</p>
                            </div>
                            <p className='gotan'>Got An Account Already</p>
                            <div className='rod'>
                                <div className='rod1'>
                                </div>
                                <Link to='/signin' className='signinlink'>Signin</Link>
                                <div className='rod2'></div>
                            </div>
                            <div className="btndiv">
                                <button disabled={btndisable} onClick={() => signupAcc()}>Sign Up</button>
                            </div>

                        </div>

                    </div>


                </div>

            </div>
        </>
    )
}

export default Signup