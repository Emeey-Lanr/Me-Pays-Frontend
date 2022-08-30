import './dasboard.css'
import './account.css'
import Logo from './Logo'
import not from '../imges/not.png'
import { VscGraphLine } from 'react-icons/vsc'
import { GrProjects, GrCreditCard, GrPerformance, GrUserSettings, GrSync, GrTextAlignRight, GrClose } from "react-icons/gr";
import { RiWindow2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai"
import { FaUpload, FaCamera } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useState } from 'react';
const Account = () => {
    const [dashback, setdashbaack] = useState(false)
    const [dash, setdash] = useState(true)
    const [displaydash, setdisplaydash] = useState(
        { color: '#768a9e' }
    )


    const showdash = () => {
        setdashbaack(true)
        setdisplaydash(
            { display: 'flex' }
        )
        setdash(true)
    }
    const backhide = () => {
        setdashbaack(false)
        setdisplaydash(
            { display: 'none' }
        )
    }
    return (
        <>

            <div className='dashboardbody'>
                {dashback && <div className='backdash' onClick={() => backhide()}></div>}
                {dash && <div className='dashsidebar' style={displaydash}>
                    <div>
                        <Logo />

                        <div className='dashdetails'>
                            <div className='dashboardpage' style={{ borderRight: 'none', borderRadius: 'none' }}>
                                <Link to='/dasHboard' className='dashdetailscon'><span className='dashicon'><GrProjects /></span><span>Dashboard</span></Link>
                            </div>
                            <p className='dashtext'>Services</p>
                            <div>
                                <Link to='/transaction' className='dashdetailscon'> <span className='dashicon'><GrCreditCard /></span><span>Transaction</span></Link>
                            </div>
                            <div style={{ borderRight: '2px solid #0067F5', borderRadius: '3px' }}>
                                <Link to='/wallet' className='dashdetailscon'><span className='dashicon'><RiWindow2Line /></span><span>Wallet</span></Link>
                            </div>
                            <div>
                                <Link to='/dasboard' className='dashdetailscon'><span className='dashicon'><VscGraphLine /></span><span>Investement</span></Link>
                            </div>
                            <div>
                                <Link to='/dasboard' className='dashdetailscon'><span className='dashicon'><AiOutlineSave /></span><span>Savings</span></Link>
                            </div >

                        </div >


                        <div className='account'>
                            <div>
                                <Link to='/dasboard' className='link'><GrUserSettings /><span>Account</span></Link>
                            </div>
                            <div>
                                <Link to='/dasboard' className='link'><GrPerformance /><span>Setting</span></Link>
                            </div>
                            <div>
                                <Link to='/dasboard' className='link'><GrSync /><span>Signout</span></Link>
                            </div>

                        </div>

                    </div >

                </div >}

                <div className='dashcont'>
                    <div className='dashheadercont'>
                        <div>
                            <div className='dashsidebtn'><button onClick={() => showdash()}><GrTextAlignRight /> </button></div>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <span>Oyelowo</span>
                            <div className='imgonline'>
                                <img src={not} alt="" width='40px' height='40px' style={{ borderRadius: "40px" }} />
                                <div className='online'>.</div>
                            </div>


                        </div>

                    </div>
                    <div>
                        <p className='profileacc'>Account/Settings</p>
                        <div className='profileboard'>
                            <p className='profile'>Profile</p>
                            <div className='img'>
                                <img src={not} alt="" />
                            </div>
                            <div className='label'>
                                <label htmlFor='img-upload'>
                                    <FaCamera />
                                    <input type="file" id='img-upload' hidden />
                                </label>
                            </div>

                            <div className='accountDetails'>
                                <div>
                                    <p>FirstName</p>
                                    <input type="text" />
                                </div>
                                <div>
                                    <p>Last Name</p>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className='accountDetails' >
                                <div>
                                    <p>Email</p>
                                    <input type="text" />
                                </div>
                                <div>
                                    <p>Phone Number</p>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className='accountDetails'>
                                <div>
                                    <p>Account</p>
                                    <input type="text" />
                                </div>
                                <div>
                                    <p>Pin </p>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className='accdetbtn'>
                                <button>Save Changes</button>
                                <button className='btt'>Cancel</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div >




        </>
    )
}

export default Account