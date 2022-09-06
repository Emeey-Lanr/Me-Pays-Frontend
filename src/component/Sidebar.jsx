import './sidebar.css'
import Logo from './Logo'
import { VscGraphLine } from 'react-icons/vsc'
import { GrProjects, GrCreditCard, GrPerformance, GrUserSettings, GrSync, GrTextAlignRight, GrClose } from "react-icons/gr";
import { RiWindow2Line } from "react-icons/ri";
import { AiOutlineSave } from "react-icons/ai"

import { Link } from 'react-router-dom'
import { BsCurrencyExchange } from "react-icons/bs";
const Sidebar = () => {

    return (

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
                    <div>
                        <Link to='/account' className='link'><GrUserSettings /><span>Account</span></Link>
                    </div>
                    <div>
                        <Link to='/signin' className='link'><GrSync /><span>Signout</span></Link>
                    </div>

                </div>

            </div >

        </div >



    )
}

export default Sidebar