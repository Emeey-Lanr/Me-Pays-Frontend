import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './component/Dashboard';
import Erropage from './component/Erropage';
import Indexpage from './component/Indexpage';
import Signin from './component/Signin';
import Signup from './component/Signup';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Indexpage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Erropage />} />
      </Routes>

    </>
  );
}

export default App;
