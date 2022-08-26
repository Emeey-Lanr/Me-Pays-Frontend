import './login.css'
import Logo from './Logo'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Signup = () => {
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
                            <div className='inputsect'>
                                <p>FirstName</p>
                                <div>
                                    <span><FaUserAlt /> </span>  <input type="text" />
                                </div>
                                <p>Last Name</p>
                                <div>
                                    <span></span> <input type="text" />
                                </div>
                                <p>Email</p>
                                <div>
                                    <span></span><input type="text" />
                                </div>
                                <p>Phone Number</p>
                                <div>
                                    <span></span> <input type="text" />
                                </div>
                                <p>Password</p>
                                <div>
                                    <span></span> <input type="text" />
                                </div>
                            </div>
                            <div className='rod'>
                                <div className='rod1'></div>
                                <Link to='/signin'>Signin</Link>
                                <div className='rod2'></div>
                            </div>

                        </div>

                    </div>


                </div>

            </div>
        </>
    )
}

export default Signup