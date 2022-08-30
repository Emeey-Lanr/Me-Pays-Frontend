import { Link } from 'react-router-dom'
import Logo from './Logo'
import './transferfund.css'
import { useState } from 'react'
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

    const endpoint = 'http://localhost:4141/user/dashboard'

    axios.get(endpoint).then((result) => {
        setuser(result.data)
        setuserid(user._id)

        // console.log(result.data)
    })
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

    let amounttransferred = { amounttransferred: amount }
    const navigate = useNavigate()
    const send = () => {
        console.log(user)
        if (userpin === 0 || beneficiaryname === '' || amount === 0 || description === '' || benficaiaryaccnumb === 0) {
            alert('yes it is')
        } else {
            if (userpin != user.accountPin) {
                alert('invalid pin')
            } else if (userpin == user.accountPin && (user.accountBalance < amount)) {
                alert('unable to transfer')
            } else if (userpin == user.accountPin && (user.accountBalance > amount)) {
                axios.post(transferendpoint, amounttransferred).then((result) => {
                    navigate('/dashboard')
                })
                axios.post(fundhistory, funacchistory).then((result) => {

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
                            <input type="text" onChange={(e) => setbeneficiaryaccnumb(+e.target.value)} />
                        </div>
                        <div className='transferinpt'>
                            <p>Amount</p>
                            <input type="number" onChange={(e) => setamount(+e.target.value)} />
                        </div>
                        <div className='transferinpt'>
                            <p>Pin</p>
                            <input type="number" onChange={(e) => setuserpin(e.target.value)} />
                        </div>
                        <div className='transferinpt'>
                            <p>Description</p>
                            <textarea onChange={(e) => setdescription(e.target.value)}></textarea>
                        </div>
                        <div className='transferbtn'>
                            <button className='tranfercancel' ><Link to='/dashboard' style={{ textDecoration: 'none', color: 'white' }}>Cancel</Link> </button>
                            <button className='transfersend' onClick={() => send()}>Send</button>
                        </div>

                    </div>


                </div>

            </div>

        </>
    )
}

export default Transfer