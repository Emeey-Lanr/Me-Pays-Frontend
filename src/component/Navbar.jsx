import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { GrTextAlignRight, GrClose } from 'react-icons/gr'
const Navbar = () => {
    const [btn, setbtn] = useState(false)
    const [bar, setbar] = useState(false)
    const show = () => {
        setbtn(false)
        setbar(true)
    }
    return (
        <>
            <div className="navbar">
                <Logo />
                <div className="navlink">
                    <Link to={'/signup'} className='signup'>Signup</Link>
                    <Link to={'/signin'} className="signin">Login</Link>
                    <Link to={'/signin'} className="aboutus">About us</Link>
                </div>
                <div className='dropbtn'>
                    {btn && <button className='show' onClick={() => show()}><GrTextAlignRight /></button>}
                </div>
                {bar && <div className='dropdown'>
                    <div className='hidebtn'>
                        <button className='hide'><GrClose /></button>
                    </div>
                    <div className='dropdowncon'>
                        <div className='bodybar'>
                            <div className='_sb1'><Link to={'/signup'} className='signup_'>Signup</Link></div>
                            <div className='_sb2'><Link to={'/signin'} className='signin_'>Login</Link></div>
                            <div className='_sb3'><Link to={'/signin'} className='aboutus_'>About us</Link></div>
                        </div>
                    </div>


                </div>}

            </div>
        </>
    )
}

export default Navbar