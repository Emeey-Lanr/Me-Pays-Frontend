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
import Sidebar from './Sidebar';
import { BsCurrencyExchange } from "react-icons/bs";


const Dashboard = ({ userident, setuserpin }) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

    });


    const [dashback, setdashbaack] = useState(false)
    const [dash, setdash] = useState(false)
    const [displaydash, setdisplaydash] = useState(
        { color: '#768a9e' }
    )
    const [acchide, setacchide] = useState(false)
    const [userdetails, setuserdetails] = useState({})
    const [inflowdetails, setinflowdetails] = useState({})

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
        // setdisplaydash(
        //     { display: 'flex' }
        // )
        setdash(true)
    }
    const backhide = () => {
        setdashbaack(false)
        // setdisplaydash(
        //     { display: 'none' }
        // )
        setdash(false)
    }


    const endpoint = 'http://localhost:4141/user/dashboard'
    const inflowget = 'http://localhost:4141/user/inflowget'
    const outflowget = 'http://localhost:4141/user/outflowget'
    const [outflow, setoutflowdetails] = useState({})

    const getDetails = () => {
        axios.get(endpoint).then((result) => {
            setuserdetails(result.data)
            setpin(result.data.accountPin)
        })
        axios.get(inflowget).then((result) => {
            setinflowdetails(result.data)
        })
        axios.get(outflowget).then((result) => {
            setoutflowdetails(result.data)
        })
    }
    useEffect(() => {
        getDetails()


    }, [])





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
    //
    const fundhistory = 'http://localhost:4141/user/fundacchistory'
    //Transaction

    const transactionhistory = 'http://localhost:4141/user/transactionhistory'
    const [notransaction, setnotransaction] = useState(false)
    const [trans1, settrans1] = useState(false)
    const [trans2, settrans2] = useState(false)
    const [trans3, settrans3] = useState(false)
    const [transaction1, settransaction1] = useState({})
    const [transaction2, settransaction2] = useState({})
    const [transaction3, settransaction3] = useState({})
    const transactionfunction = () => {
        axios.get(transactionhistory).then((result) => {
            // setnotransaction(true)
            if (result.data.length < 1) {
                setnotransaction(true)
                settrans1(false)
                settrans2(false)
                settrans3(false)


            } else if (result.data.length == 1) {
                setnotransaction(false)
                settrans1(true)
                settrans2(false)
                settrans3(false)
                settransaction1(result.data[result.data.length - 1])

            } else if (result.data.length == 2) {
                setnotransaction(false)
                settrans1(false)
                settrans2(true)
                settrans3(false)
                settransaction1(result.data[result.data.length - 1])
                settransaction2(result.data[result.data.length - 2])

            } else if (result.data.length > 3) {
                setnotransaction(false)
                settrans1(false)
                settrans2(false)
                settrans3(true)
                settransaction1(result.data[result.data.length - 1])
                settransaction2(result.data[result.data.length - 2])
                settransaction3(result.data[result.data.length - 3])
            }
        })

    }
    useEffect(() => {
        transactionfunction()
        getDetails()

    }, [])



    //Trasaction History JSON
    let currentime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    let funacchistory = {
        transferid: userdetails._id,
        beneficiaryName: userdetails.firstName,
        beneficiaryAccountNumber: userdetails.accounNumber,
        amountTransfer: amount,
        decription: 'Withdrawal of money from first Bank',
        mode: 'credit',
        date: date.getDate(),
        year: date.getFullYear(),
        month: date.getMonth(),
        time: currentime,
    }

    //Pin validation 
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

    ///Inflowendpoint
    const [fundanimation, setfundanimation] = useState(false)
    const inflowendpoint = 'http://localhost:4141/user/inflow'
    let inflow = { amount: amount }

    let userpin = { accountPin: pin, accountBalance: amount }

    const fundaccount = () => {
        if (userdetails.accountPin === 0) {
            setfundanimation(true)
            axios.post(fundaccountendpoint, userpin).then((result) => {



                console.log(result)
                if (result.data.status === true) {
                    setacchide(false)
                    getDetails()
                    transactionfunction()
                    setuserpin(userdetails.accountPin)
                    setfundanimation(false)

                } else {
                    getDetails()
                    transactionfunction()
                }

            })
            axios.post(fundhistory, funacchistory).then((result) => {
                getDetails()


            })
            axios.get(transactionhistory).then((result) => {
                transactionfunction()
            })
            axios.post(inflowendpoint, inflow).then((result) => {
                if (result.data.status === true) {
                    getDetails()
                    transactionfunction()
                } else {
                    getDetails()
                    transactionfunction()
                }
            })
        }





    }

    //Pin creation
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
                setfundanimation(true)
                if (result.data.status === true) {
                    setacchide(false)
                    getDetails()
                    transactionfunction()
                    setuserpin(userdetails.accountPin)
                    setfundanimation(false)

                } else {
                    getDetails()
                    transactionfunction()
                    setfundanimation(false)
                }

            })
            axios.post(fundhistory, funacchistory).then((result) => {
                getDetails()


            })
            axios.get(transactionhistory).then((result) => {
                transactionfunction()
            })
            axios.post(inflowendpoint, inflow).then((result) => {
                if (result.data.status === true) {
                    getDetails()
                    transactionfunction()
                } else {
                    getDetails()
                    transactionfunction()
                }
            })


        }

    }
    //condtional Styling for transaction Details
    const [credit, setcredit] = useState({
        color: '#71dd37',
        background: '#eefbe7'
    })
    const [debit, setdebit] = useState({
        color: '#ff3e1d',
        background: '#ffe7e3'
    })

    return (
        <>
            {dashback && <div className='backdash' onClick={() => backhide()}></div>}
            {dash && <Sidebar />}
            <div className='dashboardbody'>

                <div className='dashsidebar'>
                    <div>
                        <Logo />

                        <div className='dashdetails'>
                            <div className='dashboardpage'>
                                <Link to='/dasHboard' className='dashdetailscon'><span className='dashicon'><GrProjects /></span><span>Dashboard</span></Link>
                            </div>
                            <p className='dashtext'>Services</p>
                            <div>
                                <Link to='/transaction' className='dashdetailscon'> <span className='dashicon'><GrCreditCard /></span><span>Transactions</span></Link>
                            </div>
                            <div>
                                <Link to='/wallet' className='dashdetailscon'><span className='dashicon'><RiWindow2Line /></span><span>Wallet</span></Link>
                            </div>
                            <div>
                                <Link to='/investment' className='dashdetailscon'><span className='dashicon'><VscGraphLine /></span><span>Investment</span></Link>
                            </div>
                            <div>
                                <Link to='/wallet' className='dashdetailscon'><span className='dashicon'><AiOutlineSave /></span><span>Savings</span></Link>
                            </div >

                        </div >


                        <div className='account'>
                            <p>Settings</p>
                            <div>
                                <Link to='/account' className='link'><GrUserSettings /><span>Account</span></Link>
                            </div>
                            <div>
                                <Link to='/signin' className='link'><GrSync /><span>Signout</span></Link>
                            </div>

                        </div>

                    </div >

                </div >

                <div className='dashcont'>
                    <div className='dashheadercont'>
                        <div>
                            <div className='dashsidebtn'><button onClick={() => showdash()}><GrTextAlignRight /> </button></div>
                        </div>
                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <span>{userdetails.firstName}</span>
                            <div className='imgonline'>
                                {userdetails.imgUrl === '' ? < img src={not} alt="" width='40px' height='40px' style={{ borderRadius: "40px" }} /> : <img src={userdetails.imgUrl} alt="" width='40px' height='40px' style={{ borderRadius: "40px" }} />}
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
                                    <p> {userdetails.accountBalance === 0 ? '$0.00' : formatter.format(userdetails.accountBalance)}</p>
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
                                    <p><Link to='/wallet' style={{ textDecoration: 'none' }}>Create Wallet</Link></p>
                                </button>
                            </div>
                            <div className='dashsavings'>
                                <div className=''>
                                    <p style={{ textAlign: 'center', fontWeight: '500', color: '#556A7F' }}>Current Market</p>
                                    <div className='invest'>
                                        <div className='invest1'>
                                            <p className='investp'>Rux Coin</p><div style={{ display: 'flex', justifyContent: 'flex-end', borderRadius: "0 4px 4px 0" }}><span style={{ color: 'white', paddingRight: '3px', fontWeight: '500' }}>100%</span></div>
                                        </div>
                                        <div className='invest2'>
                                            <p className='investp'>BetCoin</p><div style={{ display: 'flex', justifyContent: 'flex-end', borderRadius: "0 4px 4px 0" }}><span style={{ color: 'white', paddingRight: '3px', fontWeight: '500' }}>50%</span></div>
                                        </div>
                                        <div className='invest3'>
                                            <p className='investp'>Bit coin</p><div style={{ display: 'flex', justifyContent: 'flex-end', borderRadius: "0 4px 4px 0" }}><span style={{ color: 'white', paddingRight: '3px', fontWeight: '500' }}>75%</span></div>
                                        </div>
                                        <div className='invest4'>
                                            <p className='investp'>Love Coin</p><div style={{ display: 'flex', justifyContent: 'flex-end', borderRadius: "0 4px 4px 0" }}><span style={{ color: 'white', paddingRight: '3px', fontWeight: '500' }}>30%</span></div>
                                        </div>
                                        <div className='invest5'>
                                            <p className='investp'>Love Coin</p><div style={{ display: 'flex', justifyContent: 'flex-end', borderRadius: "0 4px 4px 0" }}><span style={{ color: 'white', paddingRight: '3px', fontWeight: '500' }}>15%</span></div>
                                        </div>

                                    </div>


                                </div>
                            </div>

                        </div>
                        <div className='sect2'>
                            <div className='transhis'>
                                <p className='transdashtext'>Transactions  Details</p>
                                {notransaction && <div style={{ textAlign: 'center', fontSize: "1.3rem", fontWeight: '500', color: '#d6d6d6', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No Transactions History</div>}
                                {trans1 &&
                                    <div className='dashtranscinfo'>
                                        <span className='dashsign' style={transaction1.mode === 'credit' ? credit : debit}><BsCurrencyExchange /></span>
                                        <div className='dashtransc'>
                                            <p>{transaction1.mode}</p>
                                            <p>{formatter.format(transaction1.amountTransfer)}</p>
                                        </div>

                                        <p><span>{transaction1.month}</span>/<span>{transaction1.date}</span>/<span>{transaction1.year}</span></p>
                                    </div>
                                }
                                {trans2 && <><div className='dashtranscinfo'>
                                    <span className='dashsign' style={transaction1.mode === 'credit' ? credit : debit}><BsCurrencyExchange /></span>
                                    <div className='dashtransc'>
                                        <p>{transaction1.mode}</p>
                                        <p>{formatter.format(transaction1.amountTransfer)}</p>
                                    </div>

                                    <p><span>{transaction1.month}</span>/<span>{transaction1.date}</span>/<span>{transaction1.year}</span></p>
                                </div>
                                    <div className='dashtranscinfo'>
                                        <span className='dashsign' style={transaction2.mode === 'credit' ? credit : debit}><BsCurrencyExchange /></span>
                                        <div className='dashtransc'>
                                            <p>{transaction2.mode}</p>
                                            <p>{formatter.format(transaction2.amountTransfer)}</p>
                                        </div>

                                        <p><span>{transaction2.month}</span>/<span>{transaction2.date}</span>/<span>{transaction2.year}</span></p>
                                    </div>
                                </>}
                                {trans3 && <>
                                    <div className='dashtranscinfo'>
                                        <span className='dashsign' style={transaction1.mode === 'credit' ? credit : debit}><BsCurrencyExchange /></span>
                                        <div className='dashtransc'>
                                            <p>{transaction1.mode}</p>
                                            <p>{formatter.format(transaction1.amountTransfer)}</p>
                                        </div>

                                        <p><span>{transaction1.month}</span>/<span>{transaction1.date}</span>/<span>{transaction1.year}</span></p>
                                    </div>
                                    <div className='dashtranscinfo'>
                                        <span className='dashsign' style={transaction2.mode === 'credit' ? credit : debit}><BsCurrencyExchange /></span>
                                        <div className='dashtransc'>
                                            <p>{transaction2.mode}</p>
                                            <p>{formatter.format(transaction2.amountTransfer)}</p>
                                        </div>

                                        <p><span>{transaction2.month}</span>/<span>{transaction2.date}</span>/<span>{transaction2.year}</span></p>
                                    </div>
                                    <div className='dashtranscinfo'>
                                        <span className='dashsign' style={transaction3.mode === 'credit' ? credit : debit}><BsCurrencyExchange /></span>
                                        <div className='dashtransc'>
                                            <p>{transaction3.mode}</p>
                                            <p>{formatter.format(transaction3.amountTransfer)}</p>
                                        </div>

                                        <p><span>{transaction3.month}</span>/<span>{transaction3.date}</span>/<span>{transaction3.year}</span></p>
                                    </div>
                                </>}
                                <div className='seealllink'>
                                    <Link to='/transaction' className='seeallink'>See All</Link>
                                </div>
                            </div>
                            <div className='transactiondetailsboard'>
                                <div className='Sent'>
                                    <span><GrCreditCard /></span><br />
                                    <p style={{ width: '10px', height: '10px', borderRadius: '10px', background: '#ff3e1d' }}></p>
                                    <p className='senttext' style={{ color: ' #f87760' }}>Outflow</p>
                                    <span className='moneyinvolved'>{formatter.format(outflow.amount)}</span>
                                </div>
                                <div className='Saved'>
                                    <span style={{ color: '#71dd37' }}>
                                        <GrCreditCard />
                                    </span><br />
                                    <p style={{ width: '10px', height: '10px', borderRadius: '10px', background: '#71dd37' }}></p>
                                    <p className='senttext'>Inflow</p>
                                    <span className='moneyinvolved'>{formatter.format(inflowdetails.amount)}</span>
                                </div>

                            </div>
                        </div>


                    </div>

                </div>

            </div >


            {
                acchide && <div className='funacc'>
                    <div className='fundform'>
                        <div style={{ cursor: 'pointer', width: '90%', margin: 'auto' }} onClick={() => setacchide(false)}>&times;</div>
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
                        {fundanimation && <div className='fundingaccounanimation'>
                            <div className='f1'></div>
                            <div className='f2'></div>
                            <div className='f3'></div>
                            <div className='f4'></div>
                        </div>}
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {createpin && <button disabled={pinvalidationbtn} onClick={() => fundaccount()}>Fund Account</button>}
                            {fundacc2validation && <button onClick={() => fundaccount2()}>Fund Account</button>}

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Dashboard