import './dasboard.css'
import Logo from './Logo'
import not from '../imges/not.png'
import { VscGraphLine } from 'react-icons/vsc'
import { GrProjects, GrCreditCard, GrPerformance, GrUserSettings, GrSync, GrTextAlignRight, GrClose } from "react-icons/gr";
import { RiWindow2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai"

import { Link } from 'react-router-dom'
const Dashboard = () => {
    return (
        <>
            <div className='dashboardbody'>
                <div className='dashsidebar'>
                    <div>
                        <Logo />

                        <div className='dashdetails'>
                            <div className='dashboardpage'>
                                <Link to='/dasboard' className='dashdetailscon'><span className='dashicon'><GrProjects /></span><span>Dashboard</span></Link>
                            </div>
                            <p className='dashtext'>Services</p>
                            <div>
                                <Link to='/dasboard' className='dashdetailscon'> <span className='dashicon'><GrCreditCard /></span><span>Transaction</span></Link>
                            </div>
                            <div>
                                <Link to='/dasboard' className='dashdetailscon'><span className='dashicon'><RiWindow2Line /></span><span>Wallet</span></Link>
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

                </div >
                <div className='dashcont'>
                    <div className='dashheadercont'>
                        <div>
                            <div className='dashsidebtn'><button><GrTextAlignRight /> </button></div>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <span>Oyelowo</span>
                            <div className='imgonline'>
                                <img src={not} alt="" width='40px' height='40px' style={{ borderRadius: "40px" }} />
                                <div className='online'>.</div>
                            </div>


                        </div>

                    </div>
                    <div className='atmcard'>
                        <div className='atmlogo'>
                            <Logo />
                        </div>
                        <div>
                            <p style={{ padding: '5px 0', fontWeight: '500' }}>Account Balance:</p>
                            <p>₦0.00</p>
                        </div>
                        <div style={{ paddingTop: '10px' }}>
                            <p style={{ padding: '5px 0', fontWeight: '500' }}>Me Pays Account Number:</p>
                            <p className='cardnumber' style={{ letterSpacing: '14px', fontWeight: '500' }}>1234567890</p>
                        </div>
                        <div style={{ marginTop: '30px', textAlign: 'right' }}>
                            <p>Oyelowo Emmanuel</p>
                        </div>



                    </div>


                </div>
            </div >

        </>
    )
}

export default Dashboard