import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"
const Indexpage = () => {
    const navigate = useNavigate()
    const start = () => {
        navigate('/signup')
    }
    return (
        <>
            <Navbar />
            <div className="body">
                <div className="bodycontent">
                    <h2>MODERN <br />
                        <span>ELECTRONIC PAYMENT SYSTEM</span></h2>
                    <div className="textcon">
                        <p><span className="textspan1">Fast</span> and  <span className="textspan2">Effective</span> way to start a plan for you future, transfer to your loved ones</p>
                        <p>Fast and efficient ways of getting that joy passed to people around you as you taste in it too.</p>
                        <p>Me Pays does it better</p>
                        <div>
                            <button onClick={() => start()}>Get Started</button>
                        </div>

                    </div>

                </div>


            </div>


        </>

    )
}

export default Indexpage