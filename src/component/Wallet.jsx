import './dasboard.css'
import Logo from './Logo'
import not from '../imges/not.png'
import { VscGraphLine } from 'react-icons/vsc'
import { GrProjects, GrCreditCard, GrPerformance, GrUserSettings, GrSync, GrTextAlignRight, GrClose } from "react-icons/gr";
import { RiWindow2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai"
import { FaPlusCircle } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useState } from 'react';
const Wallet = () => {
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
                                <Link to='/dasboard'><GrUserSettings /><span>Account</span></Link>
                            </div>
                            <div>
                                <Link to='/dasboard'><GrPerformance /><span>Setting</span></Link>
                            </div>
                            <div>
                                <Link to='/dasboard'><GrSync /><span>Signout</span></Link>
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
                    <p style={{ textAlign: 'center', fontSize: '1.6rem' }}>Wallet</p>
                    <div style={{ width: '90%', margin: 'auto' }}>
                        <button style={{ border: 'none', background: '#ffff', boxShadow: '1px 2px 4px #ededff', padding: '10px 10px', color: '#768a9e', borderRadius: '30px' }}><FaPlusCircle /> Create Wallet </button>
                    </div>

                    <div className='dashgridsect'>
                        <div>
                            <div className='atmcard'>
                                <div className='atmlogo'>
                                    <Logo />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ padding: '5px 0', fontWeight: '500' }}>Description</p>
                                    <p>Buy food</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <div>
                                        <p style={{ padding: '5px 0', fontWeight: '500' }}>Target Amount:</p>
                                        <p>₦0.00</p>
                                    </div>
                                    <div style={{ paddingTop: '10px' }}>
                                        <p style={{ padding: '5px 0', fontWeight: '500' }}>Wallet Amount:</p>
                                        <p className='cardnumber' style={{ letterSpacing: '14px', fontWeight: '500', fontFamily: 'sans-serif', letterSpacing: 'unset' }}>₦0.00</p>
                                    </div>

                                </div>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <button style={{ border: 'none', margin: '0 10px', padding: '10px 20px', borderRadius: '5px', background: '#ffff' }}>Fund</button>
                                    <button style={{ border: 'none', margin: '0 10px', padding: '10px 20px', borderRadius: '5px', background: '#ffff' }}>Withdraw</button>
                                    <button style={{ border: 'none', margin: '0 10px', padding: '10px 20px', borderRadius: '5px', background: '#ffff' }}>Delete</button>
                                </div>
                            </div>


                        </div>


                    </div>




                </div>
            </div >
            <div className='createwalletmodal'>
                <div className='walletmod'>
                    <Logo />
                    <div className='walletform'>
                        <div>
                            <p>Description</p>
                            <input type="text" />
                        </div>
                        <div>
                            <p>Target Ammount</p>
                            <input type="text" />
                        </div>
                        <div className='walletcreatbtndiv'>
                            <button>Create</button>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Wallet