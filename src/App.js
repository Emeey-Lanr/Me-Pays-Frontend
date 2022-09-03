import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './component/Dashboard';
import Erropage from './component/Erropage';
import Indexpage from './component/Indexpage';
import Signin from './component/Signin';
import Signup from './component/Signup';
import { useState } from 'react'
import Transfer from './component/Transfer';
import Wallet from './component/Wallet';
import Transaction from './component/Transaction';
import Account from './component/Account';

function App() {
  const [userid, setuserid] = useState('')
  const [pin, setuserpin] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Indexpage />} />
        <Route path='/signup' element={<Signup setuserid={setuserid} />} />
        <Route path='/signin' element={<Signin setuserid={setuserid} />} />
        <Route path='/dashboard' element={<Dashboard useridenti={userid} setuserpin={setuserpin} />} />
        <Route path='/transfer' element={<Transfer pin={pin} />} />
        <Route path='/wallet' element={<Wallet />} />
        <Route path='/account' element={<Account />} />
        <Route path='/transaction' element={<Transaction />} />
        <Route path='*' element={<Erropage />} />
      </Routes>

    </>
  );
}

export default App;
