import './Navbar.css'


import {NavLink, Link} from 'react-router-dom'
import { BsSearch, BsHouseDoorFill, BsFillPersonFill, BsFillCameraFill} from 'react-icons/bs'

const Navbar = () => {

    return(
        <header id='nav'>
            <Link to='/'>ReactGram</Link>
            <form id="search-form">
                <BsSearch/>
                <input type="text" placeholder='Pesquisar' />
            </form>
            <ul id='nav-links'>
                <li><NavLink to='/'><BsHouseDoorFill/></NavLink></li>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/register'>Registrar</NavLink></li>
            </ul>


        </header>
    )
}


export default Navbar