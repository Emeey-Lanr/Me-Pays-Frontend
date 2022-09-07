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
import { useState, useEffect } from 'react';
import axios from 'axios'
import Sidebar from './Sidebar'
const Account = () => {
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
    const [user, setuserdetails] = useState({})
    const userdetails = 'http://localhost:4141/user/dashboard'
    const userdtls = () => {
        axios.get(userdetails).then((result) => {
            setuserdetails(result.data)



        })
    }
    useEffect(() => {
        userdtls()

    }, [])
    const [toast, settoast] = useState(false)
    const [spinner, setspinner] = useState(false)
    const imguploadep = 'http://localhost:4141/user/imgupload'
    const imgUpdate = 'http://localhost:4141/user/imgupdate'
    const uploadimg = (e) => {
        console.log(e.target.files[0])
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setspinner(true)
            axios.post(imguploadep, { imgurl: reader.result }).then((result) => {
                if (result.data.status === true) {
                    userdtls()
                    setspinner(false)
                } else {
                    userdtls()
                    setspinner(false)
                    settoast(true)
                    setcheckifempty('Unable to upload')
                    setTimeout(() => {
                        settoast(false)
                        setcheckifempty('')
                    }, 1500)
                }
            })

        }
    }

    //////Edit info

    const [btndis, setbtndis] = useState(true)
    const [firstName, setfirstName] = useState(user.firstName)
    const [lastName, setlastName] = useState(user.lastName)
    const [password, setpassword] = useState(user.password)
    const [phoneNumber, setphoneNumber] = useState(user.phoneNumber)
    const [pin, setPin] = useState(user.accountPin)
    const [pinres, setpinres] = useState('')
    const [checknumb, setchecknumb] = useState('')

    let phoneRegex = /^[\d]{11}$/
    let pinRegex = /^[\d]{4}$/
    let passRegex = /^[\w]{6,20}$/

    // let check = false
    const [itredgreen, setifredgreen] = useState(true)
    const checkifPinValid = (e) => {
        if (pinRegex.test(e.target.value)) {
            setpinres()
            setbtndis(false)
            setPin(e.target.value)
        } else {
            setpinres('Invalid pin, pin must be 4 digits')
            setbtndis(true)
            setifredgreen(true)
        }

    }
    const checKifNumber = (e) => {
        if (phoneRegex.test(e.target.value)) {
            setchecknumb('')
            setbtndis(false)
            setphoneNumber(e.target.value)
        } else {
            setchecknumb('Invalid phone number')
            setbtndis(true)

        }
    }

    const [red, setred] = useState(
        { color: 'red', fontWeight: "500" }
    )
    const [green, setgreen] = useState({
        color: 'green', fontWeight: '500'
    })
    const [checkifempty, setcheckifempty] = useState('')
    const editAccountEndpoint = 'http://localhost:4141/user//editAccount'
    let editedInfo = { firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, accountPin: pin }
    const saveChanges = () => {

        if (firstName === '' || lastName === '') {
            setcheckifempty('Fill in details')
            setifredgreen(true)
            settoast(true)
        } else {
            settoast(false)
            axios.post(editAccountEndpoint, editedInfo).then((result) => {
                if (result.data.status === true) {
                    settoast(true)
                    setcheckifempty('Edited Succesfully')
                    setifredgreen(false)
                    setTimeout(() => {
                        settoast(false)
                        setcheckifempty('')
                        userdtls()
                    }, 1000)
                } else {
                    settoast(true)
                    setcheckifempty('Unable to Update')
                    setifredgreen(true)
                    setTimeout(() => {
                        settoast(false)
                        setcheckifempty('')
                        userdtls()
                    }, 1000)
                }
            })
        }
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
                            <div style={{ borderRight: '2px solid #0067F5', borderRadius: '3px' }}>
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
                            <span>{user.firstName}</span>
                            <div className='imgonline'>

                                {user.imgUrl === '' ? < img src={not} alt="" width='40px' height='40px' style={{ borderRadius: "40px" }} /> : <img src={user.imgUrl} alt="" width='40px' height='40px' style={{ borderRadius: "40px" }} />}
                                <div className='online'>.</div>
                            </div>


                        </div>

                    </div>
                    <div>
                        <p className='profileacc'>Account/Settings</p>
                        <div className='profileboard'>
                            {toast && <div style={{ width: '90%', height: '60px', background: '#edf2f5', borderRadius: "5px", margin: "auto", display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                <p style={itredgreen ? red : green}>{checkifempty}</p>
                            </div>}
                            <p className='profile'>Profile</p>
                            <div className='img'>
                                {spinner && <div className='spinner'></div>}
                                {user.imgUrl === '' ? < img src={not} alt="" className='img' /> : <img src={user.imgUrl} className='img' alt='' />}

                            </div>
                            <div className='label'>
                                <label htmlFor='img-upload'>
                                    <FaCamera />
                                    <input type="file" id='img-upload' hidden onChange={(e) => uploadimg(e)} accept="image/*" />
                                </label>
                            </div>

                            <div className='accountDetails'>
                                <div>
                                    <p>FirstName</p>
                                    <input type="text" placeholder={`${user.firstName}`} onChange={(e) => setfirstName(e.target.value)} />
                                </div>
                                <div>
                                    <p>Last Name</p>
                                    <input type="text" placeholder={`${user.lastName}`} onChange={(e) => setlastName(e.target.value)} />
                                </div>
                            </div>
                            <div className='accountDetails' >
                                <div>
                                    <p>Email</p>
                                    <input type="text" placeholder={`${user.email}`} disabled={true} />
                                </div>
                                <div>
                                    <p>Phone Number</p>
                                    <input type="text" placeholder={`${user.phoneNumber}`} onChange={(e) => checKifNumber(e)} />
                                    <p style={{ color: 'red', fontSize: "0.9rem" }}>{checknumb}</p>
                                </div>
                            </div>
                            <div className='accountDetails'>
                                <div>
                                    <p>Account Number</p>
                                    <input type="text" placeholder={`${user.accounNumber}`} disabled={true} />
                                </div>
                                <div>
                                    <p>Pin </p>
                                    <input type="number" placeholder={`${user.accountPin}`} onChange={(e) => checkifPinValid(e)} />
                                    <p style={{ color: 'red', fontSize: "0.9rem" }}>{pinres}</p>
                                </div>
                            </div>
                            <div className='accdetbtn'>
                                <button disabled={btndis} onClick={() => saveChanges()}>Save Changes</button>
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