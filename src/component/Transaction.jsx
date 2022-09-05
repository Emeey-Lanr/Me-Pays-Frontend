import './dasboard.css'
import './transferfund.css'
import Logo from './Logo'
import not from '../imges/not.png'
import { VscGraphLine } from 'react-icons/vsc'
import { GrProjects, GrCreditCard, GrUserSettings, GrSync, GrTextAlignRight } from "react-icons/gr";
import { RiWindow2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai"
import { FaTrashAlt } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Sidebar from './Sidebar'
const Transaction = () => {
    const [del, setdel] = useState(false)
    const [dlt, setdlt] = useState('none')
    const [dashback, setdashbaack] = useState(false)
    const [dash, setdash] = useState(false)
    const [displaydash, setdisplaydash] = useState(
        { color: '#768a9e' }
    )


    const showdash = () => {
        setdashbaack(true)

        setdash(true)
    }
    const backhide = () => {
        setdashbaack(false)
        setdash(false)
    }
    const [userdetails, setuserdetails] = useState({})
    const endpoint = 'http://localhost:4141/user/dashboard'

    useEffect(() => {
        axios.get(endpoint).then((result) => {
            setuserdetails(result.data)

        })
    })

    const transactionendpoint = 'http://localhost:4141/user/transactionhistory'
    const [notransaction, setnotransaction] = useState(false)
    const [transaction, setransaction] = useState([])
    const getTransaction = () => {
        axios.get(transactionendpoint).then((result) => {
            setransaction(result.data.reverse())
            if (result.data.length < 1) {
                setnotransaction(false)
            } else {
                setnotransaction(true)


            }


        })

    }
    useEffect(() => {

        getTransaction()
    }, [])
    const [tid, settid] = useState('')
    const showdel = (transactionid) => {
        setdlt('flex')
        setdel(true)
        settid(transactionid)

    }

    const cancelDelete = () => {
        setdel(false)
        setdlt('none')
    }
    const deltransep = 'http://localhost:4141/user/deletetransaction'

    const deletehis = () => {
        axios.post(deltransep, { tid: tid }).then((result) => {
            console.log(result)

            if (result.data['status'] === true) {
                setdel(false)
                setdlt('none')
                getTransaction()

            } else {
                setdel(false)
                setdlt('none')
                getTransaction()
            }
        })

    }
    const print = (id) => {
        let reciept = document.getElementById(`div${id}`).innerText
        document.body.style.border = '1px solid black'
        document.body.style.width = '90%'
        document.body.style.margin = '0 auto'
        document.body.style.padding = '10px 0 20px 5px'
        document.body.innerText = reciept
        window.print()
    }
    return (
        <>
            {dashback && <div className='backdash' onClick={() => backhide()}></div>}
            {dash && <Sidebar />}
            <div className='dashboardbody'>

                <div className='dashsidebar'>
                    <div>
                        <Logo />

                        <div className='dashdetails'>
                            <div className='dashboardpage' style={{ borderRight: 'none', borderRadius: 'none' }}>
                                <Link to='/dasHboard' className='dashdetailscon'><span className='dashicon'><GrProjects /></span><span>Dashboard</span></Link>
                            </div>
                            <p className='dashtext'>Services</p>
                            <div style={{ borderRight: '2px solid #0067F5', borderRadius: '3px' }}>
                                <Link to='/transaction' className='dashdetailscon'> <span className='dashicon'><GrCreditCard /></span><span>Transaction</span></Link>
                            </div>
                            <div>
                                <Link to='/wallet' className='dashdetailscon'><span className='dashicon'><RiWindow2Line /></span><span>Wallet</span></Link>
                            </div>
                            <div>
                                <Link to='/investment' className='dashdetailscon'><span className='dashicon'><VscGraphLine /></span><span>Investement</span></Link>
                            </div>
                            <div>
                                <Link to='/dashboard' className='dashdetailscon'><span className='dashicon'><AiOutlineSave /></span><span>Savings</span></Link>
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
                    <div className='transaction_History'>
                        <p>Transaction History</p>
                    </div>
                    <div className='transaction_History_content'>
                        {notransaction ? transaction.map((items, id) => (

                            < div className='div' id={`div${id}`} key={id} >
                                <p>Date: <span>{items.date}</span>/<span>{items.month}</span>/<span>{items.year}</span></p>
                                <p>Beneficiary Name: <span>{items.beneficiaryName}</span></p>
                                <p>Beneficiary Acc No:<span>{items.beneficiaryAccountNumber}</span> </p>
                                <p>Description: <span>{items.decription}</span></p>
                                <p>Amount: <span>{items.amountTransfer}</span></p>
                                <p>Transfer Type: <span>{items.mode}</span></p>
                                {/* <p>Refrence Id: <span>{ }</span></p> */}
                                <p>Time: <span>{items.time}</span></p>
                                <div className='transactionbutton'>
                                    <button onClick={() => showdel(items._id)}>Delete</button>
                                    <button onClick={() => print(id)} style={{ marginLeft: '20px' }}>Print</button>
                                </div>
                            </div>


                        )) : <div > No Transaction</div>
                        }


                    </div>


                </div>
            </div>

            {del && <div className='deletwalletModal' style={{ display: `${dlt}` }}>
                <div className='sureyouwntdlt'>
                    <div>
                        <div className='trash'><FaTrashAlt /></div>
                        <p>Are you sure that u want to delete ?</p>
                        <div className='walletbtndlt'>
                            <button className='dlt' onClick={() => deletehis()}>Delete</button> <button onClick={() => cancelDelete()}>Cancel</button>
                        </div>

                    </div>
                </div>
            </div>}



        </>
    )
}

export default Transaction