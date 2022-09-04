import { Link } from 'react-router-dom'
import Logo from './Logo'
import './transferfund.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Transfer = ({ pin }) => {
    const [user, setuser] = useState({})
    const [userid, setuserid] = useState('')
    const [userpin, setuserpin] = useState(0)
    const [beneficiaryname, setbeneficiaryname] = useState('')
    const [amount, setamount] = useState(0)
    const [benficaiaryaccnumb, setbeneficiaryaccnumb] = useState(0)
    const [description, setdescription] = useState('')

    const [transfermodal, settranfermodal] = useState(false)
    const [ifsuccess, setifsuccess] = useState('')
    const [ifsuccesss, setifsuccesss] = useState('')

    const [succ, setsucc] = useState(true)
    const endpoint = 'http://localhost:4141/user/dashboard'
    useEffect(() => {
        settranfermodal(false)
        axios.get(endpoint).then((result) => {
            setuser(result.data)
            setuserid(user._id)

            // console.log(result.data)
        })
    }, [])

    const transferendpoint = 'http://localhost:4141/user/transfer'
    const [date, setdate] = useState(new Date())
    const fundhistory = 'http://localhost:4141/user/fundacchistory'
    let funacchistory = {
        transferid: user._id,
        beneficiaryName: beneficiaryname,
        beneficiaryAccountNumber: benficaiaryaccnumb,
        amountTransfer: amount,
        decription: description,
        refrenceid: `${Math.trunc(Math.random() * 2345)}`,
        mode: 'Debit',
        date: date.getDate(),
        year: date.getFullYear(),
        month: date.getMonth(),
        time: { hour: date.getHours(), minutes: date.getMinutes() }
    }
    let outflowep = 'http://localhost:4141/user/outflow'
    let outflow = { amount: amount }
    let amounttransferred = { amounttransferred: amount }
    const navigate = useNavigate()
    const send = () => {
        console.log(user)

        if (userpin === 0 || beneficiaryname === '' || amount === 0 || description === '' || benficaiaryaccnumb === 0) {
            setifsuccesss('Fill in Details')
        } else {
            if (userpin != user.accountPin) {
                setifsuccess('Invalid Pin')

            } else if (userpin == user.accountPin && (user.accountBalance < amount)) {
                settranfermodal(true)
                setTimeout(() => {
                    setifsuccess('Insuffiencient Amount')
                    setsucc(false)
                }, 2000);
                setTimeout(() => {
                    setifsuccess('')
                    settranfermodal(false)
                }, 2500);


            } else if (userpin == user.accountPin && (user.accountBalance > amount || user.accountBalance > 100)) {
                settranfermodal(true)
                axios.post(transferendpoint, amounttransferred).then((result) => {
                    if (result.data.status === true) {
                        setifsuccess(result.data.mesage)
                        setsucc(true)
                        setTimeout(() => {
                            navigate('/dashboard')
                            setifsuccess('')

                        }, 1000)
                    } else {
                        setifsuccess(result.data.mesage)
                        setsucc(false)
                        setTimeout(() => {
                            navigate('/dashboard')
                            setifsuccess('')
                        }, 1000)

                    }

                    // setifsuccess()
                    // 

                })
                axios.post(fundhistory, funacchistory).then((result) => {

                })
                axios.post(outflowep, outflow).then((result) => {

                })

            }
        }
    }
    return (
        <>
            <div className='transferpage'>
                <div className='tansferlogopage'>
                    <div className='transferform'>
                        <Logo />
                        <p className='transfer'>Transfer</p>
                        <div className='transferinpt'>
                            <p>Beneficiary Name</p>
                            <input type="text" onChange={(e) => setbeneficiaryname(e.target.value)} />
                        </div>
                        <div className='transferinpt'>
                            <p>Beneficiary Acc No</p>
                            <input type="number" onChange={(e) => setbeneficiaryaccnumb(+e.target.value)} />
                        </div>
                        <div className='transferinpt'>
                            <p>Amount</p>
                            <input type="number" onChange={(e) => setamount(+e.target.value)} />
                        </div>
                        <div className='transferinpt'>
                            <p>Pin</p>
                            <input type="number" onChange={(e) => setuserpin(e.target.value)} />
                        </div>
                        <p style={{ color: 'red', fontSize: '0.9rem', width: '90%', margin: '0 auto' }}>{ifsuccess}</p>
                        <div className='transferinpt'>
                            <p>Description</p>
                            <textarea onChange={(e) => setdescription(e.target.value)}></textarea>
                        </div>
                        <p style={{ color: 'red', fontSize: '0.9rem', textAlign: 'center' }}>{ifsuccesss}</p>
                        <div className='transferbtn'>
                            <button className='tranfercancel' ><Link to='/dashboard' style={{ textDecoration: 'none', color: 'white' }}>Cancel</Link> </button>
                            <button className='transfersend' onClick={() => send()}>Send</button>
                        </div>

                    </div>


                </div>

            </div>
            {transfermodal &&
                <div className='transfermodal'>
                    <div>
                        <div className='transferballmodal'>
                            <div className="logo">
                                <div className="icon">
                                    <div className="iconsec">
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p style={succ ? { color: 'green' } : { color: 'red' }}>{ifsuccess}</p>
                    </div>


                </div>}

        </>
    )
}

export default Transfer