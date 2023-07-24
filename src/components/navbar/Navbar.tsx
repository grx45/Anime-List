
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'
import { FaBars } from 'react-icons/fa'

function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState<string>("")

    const navigate = useNavigate()

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    };

    const handleNavigation = (url: string) => {
        navigate(url)
        toggleMobileMenu();
    }

    const handleSearchSubmit = () => {
        // code for searchbar function
    }

    return (
        <nav id="navbar">
            <img onClick={() => handleNavigation("/home")} className='logo' src={logo} alt='logo' />
            <div className={`nav-list ${mobileMenuOpen ? "active" : ""}`} >
                <span className='links' onClick={() => handleNavigation("/collections")}>Collections</span>
                <div className="searchbar">
                    <FiSearch className='icon' onClick={handleSearchSubmit} />
                    <input
                        onChange={(event) => setSearchQuery(event.target.value)}
                        className='input-field'
                        type="text"
                        placeholder="Search" />
                </div>
            </div>
            <FaBars className={`menu-icon ${mobileMenuOpen ? "active" : ""}`} onClick={toggleMobileMenu} />
        </nav>
    )
}

export default Navbar;

