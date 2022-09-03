import './login.css'
import Logo from './Logo'
const Loading = ({ mepaygif }) => {
    return (
        <>
            <div className='loadingif'>
                {mepaygif ?
                    <div className='gifdiv'>
                        <div className='ball1'></div>
                        <div className='ball2'></div>
                        <div className='ball3'></div>
                        <div className='ball4'></div>
                    </div> : <Logo />}
            </div>
        </>
    )
}

export default Loading