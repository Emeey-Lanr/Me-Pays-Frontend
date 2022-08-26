import './login.css'
import Logo from './Logo'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Signin = () => {
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
                                <span><FaUserAlt /></span><input type="text" />
                            </div>
                            <div className='paswordsign'>
                                <p>Password</p>
                                <span><FaLock /> </span><input type="text" />
                            </div>
                        </div>

                        <div className='signinbtn'>
                            <button>Sign In</button>
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