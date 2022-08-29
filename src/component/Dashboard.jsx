import './dasboard.css'
import Logo from './Logo'
import not from '../imges/not.png'
import { VscGraphLine } from 'react-icons/vsc'
import { GrProjects, GrCreditCard, GrPerformance, GrUserSettings, GrSync, GrTextAlignRight, GrClose } from "react-icons/gr";
import { RiWindow2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai"

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Result } from 'postcss';
import { BsCurrencyExchange } from "react-icons/bs";


const Dashboard = ({ userident, setuserpin }) => {
    const [dashback, setdashbaack] = useState(false)
    const [dash, setdash] = useState(true)
    const [displaydash, setdisplaydash] = useState(
        { color: '#768a9e' }
    )
    const [acchide, setacchide] = useState(false)
    const [userdetails, setuserdetails] = useState({})

    //fund account
    const [userid, setuserid] = useState('')
    const [amount, setammount] = useState(0)
    const [pin, setpin] = useState(0)
    const [pinvalidationbtn, setpinvalidationbtn] = useState(true)
    const [fundacc2validation, setacc2validation] = useState(false)
    const [pinvalidation, setpinvalidation] = useState('')
    const [createpin, setcreatpin] = useState(true)
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
    const endpoint = 'http://localhost:4141/user/dashboard'

    axios.get(endpoint).then((result) => {
        setuserdetails(result.data)
        console.log(result.data)
    })



    const showfundmodal = () => {
        setacchide(true)
        if (userdetails.accountPin === 0) {
            setcreatpin(true)
        } else {
            setcreatpin(false)
        }
    }
    const [date, setdate] = useState(new Date())
    const fundaccountendpoint = 'http://localhost:4141/user/fundaccount'
    const fundhistory = 'http://localhost:4141/user/fundacchistory'
    let funacchistory = {
        transferid: userdetails.id,
        beneficiaryName: userdetails.firstName,
        beneficiaryAccountNumber: userdetails.accounNumber,
        amountTransfer: amount,
        decription: 'Withdrawal of money from first Bank',
        mode: 'credit',
        date: date.getDate(),
        year: date.getFullYear(),
        month: date.getMonth(),
        time: { hour: date.getHours(), minutes: date.getMinutes() }
    }

    const userpinset = (e) => {
        setpinvalidation(e.target.value)
        if (e.target.value.trim().length < 4 || e.target.value.trim().length > 4) {

            setpinvalidation('You pin must be 4 digits')
            setpinvalidationbtn(true)
        } else {
            setpinvalidation('')
            setpin(e.target.value)
            setpinvalidationbtn(false)
        }
    }

    let userpin = { accountPin: pin, accountBalance: amount }
    const fundaccount = () => {
        if (userdetails.accountPin === 0) {

            axios.post(fundaccountendpoint, userpin).then((result) => {

                setuserdetails(result)
                setacchide(false)
                setuserpin(result.accountPin)

            })
            axios.post(fundhistory, funacchistory).then((result) => {
                console.log(result)
            })
        }


    }
    const pincreated = (e) => {
        if (e.target.value == userdetails.accountPin) {
            setacc2validation(true)
            setpin(e.target.value)
            setpinvalidation('')

        } else {
            setacc2validation(false)
            setpinvalidation('Invalid Pin')
        }
    }
    const fundaccount2 = () => {

        if (userdetails.accountPin != pin) {
            setpinvalidation('Invalid Pin')
        } else {
            axios.post(fundaccountendpoint, userpin).then((result) => {
                setacchide(false)
                setuserdetails(result)
                setacc2validation(false)

            })
            axios.post(fundhistory, funacchistory).then((result) => {
                console.log(result)
            })

        }
    }
    return (
        <>

            <div className='dashboardbody'>
                {dashback && <div className='backdash' onClick={() => backhide()}></div>}
                {dash && <div className='dashsidebar' style={displaydash}>
                    <div>
                        <Logo />

                        <div className='dashdetails'>
                            <div className='dashboardpage'>
                                <Link to='/dasHboard' className='dashdetailscon'><span className='dashicon'><GrProjects /></span><span>Dashboard</span></Link>
                            </div>
                            <p className='dashtext'>Services</p>
                            <div>
                                <Link to='/transaction' className='dashdetailscon'> <span className='dashicon'><GrCreditCard /></span><span>Transaction</span></Link>
                            </div>
                            <div>
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
                            <span>{userdetails.firstName}</span>
                            <div className='imgonline'>
                                <img src={not} alt="" width='40px' height='40px' style={{ borderRadius: "40px" }} />
                                <div className='online'>.</div>
                            </div>


                        </div>

                    </div>
                    <div className='dashgridsect'>
                        <div>
                            <div className='atmcard'>
                                <div className='atmlogo'>
                                    <Logo />
                                </div>
                                <div>
                                    <p style={{ padding: '5px 0', fontWeight: '500' }}>Account Balance:</p>
                                    <p> {userdetails.accountBalance === 0 ? '₦0.00' : userdetails.accountBalance}</p>
                                </div>
                                <div style={{ paddingTop: '10px' }}>
                                    <p style={{ padding: '5px 0', fontWeight: '500' }}>Me Pays Account Number:</p>
                                    <p className='cardnumber' style={{ letterSpacing: '14px', fontWeight: '500' }}>{userdetails.accounNumber}</p>
                                </div>
                                <div style={{ marginTop: '30px', textAlign: 'right' }}>
                                    <p><span>{userdetails.firstName}</span><span>{userdetails.lastName}</span></p>
                                </div>
                            </div>
                            <div className='fundacc'>
                                <button>
                                    <p className='funp1'><span><GrCreditCard /></span></p>
                                    <p><Link to='/transfer' style={{ textDecoration: 'none' }}>Transfer</Link></p>
                                </button>
                                <button onClick={() => showfundmodal()}>
                                    <p className='funp2'><span><GrCreditCard /></span></p>
                                    <p> Fund</p>
                                </button>
                                <button>
                                    <p className='funp3'><span><RiWindow2Line /></span></p>
                                    <p>Create Wallet</p>
                                </button>
                            </div>
                            <div className='dashsavings'>
                                <div className=''>
                                    Savings
                                </div>
                            </div>

                        </div>
                        <div className='sect2'>
                            <div className='transhis'>
                                <p className='transdashtext'>Transactions  Details</p>
                                <div className='dashtranscinfo'>
                                    <span className='dashsign'><BsCurrencyExchange /></span>
                                    <div className='dashtransc'>
                                        <p>Credit</p>
                                        <p>#3000</p>
                                    </div>

                                    <p><span>August</span>/<span>20</span>/<span>2001</span></p>
                                </div>
                                <div className='seealllink'>
                                    <Link to='/transaction' className='seeallink'>See All</Link>
                                </div>
                            </div>
                            <div className='transactiondetailsboard'>
                                <div className='Sent'>
                                    <span><GrCreditCard /></span>
                                    <p className='senttext' style={{ color: ' #f87760' }}>Sent</p>
                                    <span className='moneyinvolved'>₦0.00</span>
                                </div>
                                <div className='Saved'>
                                    <span>
                                        <GrCreditCard />
                                    </span>
                                    <p className='senttext'>Recieved</p>
                                    <span className='moneyinvolved'>₦0.00</span>
                                </div>

                            </div>
                        </div>


                    </div>




                </div>
            </div >

            {acchide && <div className='funacc'>
                <div className='fundform'>
                    <Logo />
                    <div style={{ width: '90%', margin: 'auto' }}>
                        <p>Enter Amount</p>
                        <input type="number" onChange={(e) => setammount(+e.target.value)} />
                    </div>
                    {createpin ?
                        <>
                            <div style={{ width: '90%', margin: 'auto' }}>
                                <p>Create A 4 digit transfer pin</p>
                                <input type="number" onChange={(e) => userpinset(e)} />
                            </div>
                        </> : <div style={{ width: '90%', margin: 'auto' }}>
                            <p>Enter your pin</p>
                            <input type="number" onChange={(e) => pincreated(e)} />
                        </div>}
                    <p style={{ color: 'red', fontSize: '0.9rem', width: '90%', margin: '0 auto' }}>{pinvalidation}</p>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {createpin && <button disabled={pinvalidationbtn} onClick={() => fundaccount()}>Fund Account</button>}
                        {fundacc2validation && <button onClick={() => fundaccount2()}>Fund Account</button>}

                    </div>
                </div>
            </div>}
        </>
    )
}

export default Dashboard