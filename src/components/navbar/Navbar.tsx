
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'
import { FaBars } from 'react-icons/fa'

function Navbar() {
    const [mobileMenuState, setMobileMenuState] = useState(false)
    const navigate = useNavigate()

    const toggleMobileMenu = () => {
        setMobileMenuState(!mobileMenuState)
    };

    return (
        <nav id="navbar">
            <img onClick={() => navigate("/home")} className='logo' src={logo} alt='logo' />
            <div className='nav-list' >
                <span className='links' onClick={() => navigate("/collections")}>Collections</span>
                <div className="searchbar">
                    <FiSearch className='icon' />
                    <input
                        className='input-field'
                        type="text"
                        placeholder="Search" />
                </div>
            </div>
            <FaBars className={`menu-icon ${mobileMenuState ? "active" : ""}`} onClick={toggleMobileMenu} />
            <div className={`mobile-menu ${mobileMenuState ? "active" : ""}`} >
                <span className='links' onClick={() => navigate("/home")}>Home</span>
                <span className='links' onClick={() => navigate("/collections")}>Collections</span>
                <div className="searchbar">
                    <FiSearch className='icon' />
                    <input
                        className='input-field'
                        type="text"
                        placeholder="Search" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;

