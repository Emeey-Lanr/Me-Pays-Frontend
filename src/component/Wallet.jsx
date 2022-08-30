import './dasboard.css'
import Logo from './Logo'
import not from '../imges/not.png'
import { VscGraphLine } from 'react-icons/vsc'
import { GrProjects, GrCreditCard, GrPerformance, GrUserSettings, GrSync, GrTextAlignRight, GrClose } from "react-icons/gr";
import { RiWindow2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai"
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
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
    //wallet modal
    const [createwallet, setcreatewallet] = useState(false)

    //
    const [userdetails, setuserdetails] = useState({})
    const endpoint = 'http://localhost:4141/user/dashboard'
    const walleturl = 'http://localhost:4141/user/wallet'
    const [wallett, setwallet] = useState()
    useEffect(() => {
        axios.get(endpoint).then((result) => {
            setuserdetails(result.data)

        })
        axios.get(walleturl).then((result) => {
            if (result.data.length == 0) {
                setnowallet(false)
            } else {
                setnowallet(true)
                setwallet(result.data)


            }

        })

    }, [wallett])

    //wallet creation 
    const [description, setdescription] = useState('')
    const [fund, setfund] = useState(0)
    const [targetAmount, settargetAmount] = useState(0)
    const [walletstatus, setwalletstatus] = useState(false)
    const [failed, setfailed] = useState(false)
    const [success, setsuccess] = useState(false)
    const [insufficient, setinfuccient] = useState(false)
    const [pinvalid, setpinvalid] = useState(true)
    const [nowallet, setnowallet] = useState(false)
    const [pinvalidtext, setpinvalidtext] = useState('')
    const [iffailed, setifailed] = useState('red')
    const walletCreationurl = 'http://localhost:4141/user//walletcreation'
    let wallet = { description: description, fund: fund, targetAmount: targetAmount, userid: userdetails._id }
    const pinvalidation = (e) => {
        if (e.target.value.trim().length < 4 || e.target.value != userdetails.accountPin) {
            setpinvalid(true)
            setpinvalidtext('Invalid Pin')
        } else {
            setpinvalid(false)
            setpinvalidtext('')
        }
    }
    const walletget = () => {
        axios.get(walleturl).then((result) => {
            if (result.data.length < 1) {
                setnowallet(false)
            } else {
                setnowallet(true)
                setwallet(result.data)


            }

            console.log(wallett)
        })

    }
    const [iffail, setiffailed] = useState('')
    const createmodal = () => {
        setcreatewallet(true)
        setiffailed('')
    }
    const createwalletbtn = () => {
        if (description === '' || targetAmount == '') {
            setpinvalidtext('fill in details')
        } else {

            axios.post(walletCreationurl, wallet).then((result) => {
                if (result.data.status == true) {
                    setiffailed('Created Succesfully')
                    setifailed('green')
                    setTimeout(() => {
                        setcreatewallet(false)
                        setnowallet(true)
                        walletget()
                    }, 1000)

                } else {
                    setiffailed('Failed')
                    setifailed('red')
                    setTimeout(() => {
                        setcreatewallet(false)
                        wallet()
                    }, 1000)

                }
            })
        }
    }
    const withdraw = (id) => {

    }
    const fundWallet = (itemsid, id) => {
        if (userdetails.accountBalance < wallett[id].targetAmount) {
            console.log(`can't transfer`)
        } else {
            console.log(`you can`)
        }

    }
    const [dlt, setdlt] = useState('none')
    const [dltid, setdltid] = useState('')
    const deletwallet = 'http://localhost:4141/user/deletewallet'

    const remove = (id) => {
        setdlt('flex')
        setdltid(id)
    }
    const deletewallet = () => {
        console.log(dltid)
        axios.post(deletwallet, { walletid: dltid }).then((result) => {
            setdlt('none')
        })

    }
    const cancelDelete = () => {
        setdlt('none')
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
                        <button onClick={() => createmodal()} style={{ border: 'none', background: '#ffff', boxShadow: '1px 2px 4px #ededff', padding: '10px 10px', color: '#768a9e', borderRadius: '30px' }}><FaPlusCircle /> Create Wallet </button>
                    </div>

                    <div className='dashgridsect'>
                        <div>
                            {nowallet ? wallett.map((items, id) => {
                                return (
                                    <>
                                        < div className='atmcard' key={id}>
                                            <div className='atmlogo'>
                                                <Logo />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <p style={{ padding: '5px 0', fontWeight: '500' }}>Description</p>
                                                <p>{items.description}</p>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                                <div>
                                                    <p style={{ padding: '5px 0', fontWeight: '500' }}>Target Amount:</p>
                                                    <p>{items.targetAmount}</p>
                                                </div>
                                                <div style={{ paddingTop: '10px' }}>
                                                    <p style={{ padding: '5px 0', fontWeight: '500' }}>Wallet Amount:</p>
                                                    {items.fund === 0 ? <p className='cardnumber' style={{ fontWeight: '500', fontFamily: 'sans-serif', letterSpacing: 'unset' }}>₦0.00</p> : <p className='cardnumber' style={{ fontWeight: '500', fontFamily: 'sans-serif', letterSpacing: 'unset' }}>{items.fund}</p>}
                                                </div>

                                            </div>


                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                                <button onClick={() => fundWallet(items._id, id)} style={{ border: 'none', margin: '0 10px', padding: '10px 20px', borderRadius: '5px', background: '#ffff' }}>Fund</button>
                                                <button onClick={() => withdraw(items._id)} style={{ border: 'none', margin: '0 10px', padding: '10px 20px', borderRadius: '5px', background: '#ffff' }}>Withdraw</button>
                                                <button onClick={() => remove(items._id)} style={{ border: 'none', margin: '0 10px', padding: '10px 20px', borderRadius: '5px', background: '#ffff' }}>Delete</button>
                                            </div>

                                            <div className='deletwalletModal' style={{ display: `${dlt}` }}>
                                                <div className='sureyouwntdlt'>
                                                    <div>
                                                        <div className='trash'><FaTrashAlt /></div>
                                                        <p>Are you sure that u want to delete ?</p>
                                                        <div className='walletbtndlt'>
                                                            <button className='dlt' onClick={() => deletewallet()}>Delete</button> <button onClick={() => cancelDelete(items._id)}>Cancel</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )

                            }) : <div></div>
                            }

                        </div>


                    </div>




                </div>
            </div >

            {
                createwallet &&
                <div className='createwalletmodal'>
                    <div className='walletmod'>
                        <div style={{ cursor: 'pointer' }} onClick={() => setcreatewallet(false)}>&times;</div>
                        <Logo />
                        <div className='walletform'>
                            <div>
                                <p>Description</p>
                                <input type="text" onChange={(e) => setdescription(e.target.value)} />
                            </div>
                            <div>
                                <p>Target Amount</p>
                                <input type="number" onChange={(e) => settargetAmount(+e.target.value)} />
                            </div>
                            <div>
                                <p >Enter Pin</p>
                                <input type="number" onChange={(e) => pinvalidation(e)} />
                            </div>
                            <p style={{ fontSize: '0.9rem', marginLeft: '20px', color: 'red' }}>{pinvalidtext}</p>
                            <p style={{ fontSize: '0.9rem', textAlign: 'center', color: `${iffailed}` }}>{iffail}</p>
                            <div className='walletcreatbtndiv'>
                                <button disabled={pinvalid} onClick={() => createwalletbtn()}>Create</button>
                            </div>
                        </div>
                    </div>

                </div>

            }
            {
                walletstatus && <div className='fundwallet'>
                    <div>
                        {success && <p>Succesfull</p>}
                        {failed && <p>Not Succesfull</p>}
                        {insufficient && <p>InsufFICIEN Amount</p>}

                    </div>

                </div>
            }
        </>
    )
}

export default Wallet