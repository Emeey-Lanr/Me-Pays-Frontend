import './dasboard.css'
import './transferfund.css'
import Logo from './Logo'
import not from '../imges/not.png'
import { VscGraphLine } from 'react-icons/vsc'
import { GrProjects, GrCreditCard, GrPerformance, GrUserSettings, GrSync, GrTextAlignRight, GrClose } from "react-icons/gr";
import { RiWindow2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai"
import { FaPlusCircle } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useState } from 'react';
const Transaction = () => {
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
                                <Link to='/account' className='link'><GrUserSettings /><span>Account</span></Link>
                            </div>
                            <div>
                                <Link to='/dasboard' className='link'><GrPerformance /><span>Setting</span></Link>
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
                    <div className='transaction_History'>
                        <p>Transaction History</p>
                    </div>
                    <div className='transaction_History_content'>
                        <div className='div '>
                            <p>Date: <span>1</span>/<span>5</span>/<span>2022</span></p>
                            <p>Beneficiary Name: <span>Oyelowow</span></p>
                            <p>Beneficiary Acc No:</p>
                            <p>Description: <span>djhgfghjkjhghjk</span></p>
                            <p>Amount: <span>$6479</span></p>
                            <p>Transfer Type: <span>Debit</span></p>
                            <p>Refrence Id: <span>3737</span></p>
                            <div className='transactionbutton'>
                                <button>Delete</button>
                                <button style={{ marginLeft: '20px' }}>Print</button>
                            </div>
                        </div>
                        <div className='div'>
                            <p>Date: <span>1</span>/<span>5</span>/<span>2022</span></p>
                            <p>Beneficiary Name: <span>Oyelowow</span></p>
                            <p>Beneficiary Acc No:</p>
                            <p>Description: <span>djhgfghjkjhghjk</span></p>
                            <p>Amount: <span>$6479</span></p>
                            <p>Transfer Type: <span>Debit</span></p>
                            <p>Refrence Id: <span>3737</span></p>
                            <div>
                                <button>Delete</button>
                                <button>Print</button>
                            </div>
                        </div>
                        <div className='div'>
                            <p>Date: <span>1</span>/<span>5</span>/<span>2022</span></p>
                            <p>Beneficiary Name: <span>Oyelowow</span></p>
                            <p>Beneficiary Acc No:</p>
                            <p>Description: <span>djhgfghjkjhghjk</span></p>
                            <p>Amount: <span>$6479</span></p>
                            <p>Transfer Type: <span>Debit</span></p>
                            <p>Refrence Id: <span>3737</span></p>
                            <div>
                                <button>Delete</button>
                                <button>Print</button>
                            </div>
                        </div>



                    </div>


                </div>
            </div >




        </>
    )
}

export default Transaction