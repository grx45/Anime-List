
import { useState } from 'react'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi'
import { FaBars } from 'react-icons/fa'

function Navbar() {
    const [mobileMenuState, setMobileMenuState] = useState(false)
    const [input, setInput] = useState("")

    const navigate = useNavigate()

    const toggleMobileMenu = () => {
        setMobileMenuState(!mobileMenuState)
    };

    const handleLinkClick = (url: string) => {
        navigate(url)
        setMobileMenuState(!mobileMenuState)

    }



    const handleSearchButton = () => {
        handleLinkClick("/results?:title")
    }

    return (
        <nav id="navbar">
            <img onClick={() => handleLinkClick("/home")} className='logo' src={logo} alt='logo' />
            <div className={`nav-list ${mobileMenuState ? "active" : ""}`} >
                <span className='links' onClick={() => handleLinkClick("/collections")}>Collections</span>
                <div className="searchbar">
                    <FiSearch className='icon' onClick={handleSearchButton} />
                    <input
                        onChange={(event) => setInput(event.target.value)}
                        className='input-field'
                        type="text"
                        placeholder="Search" />
                </div>
            </div>
            <FaBars className={`menu-icon ${mobileMenuState ? "active" : ""}`} onClick={toggleMobileMenu} />
        </nav>
    )
}

export default Navbar;

