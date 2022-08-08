import { useState } from 'react';
import { NavLink } from 'react-router-dom';

// consts
import { navLinks } from '../consts/consts';

// images
import expandedLogo from '../assets/images/expandedLogo.png'
import logo from '../assets/images/logo.png'

// icons
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiUserCircle } from 'react-icons/bi';

export function AppHeader() {
    const [isMenuOpen, setMenuState] = useState(false)

    const toggleMenu = () => {
        setMenuState(!isMenuOpen)
    }

    return (
        <header className="app-header">
            <div className="app-content-container">

                {/* dark screen */}
                <div className={`screen-overlay ${(isMenuOpen) ? 'open' : ''}`} onClick={toggleMenu}></div>

                {/* hamburger button */}
                <button className="hamburger-btn" onClick={toggleMenu}>
                    <GiHamburgerMenu className="hamburger-icon" />
                </button>

                <img className='mobile-display small-logo' src={logo} alt="" />

                {/* links */}
                <nav className="nav-container">
                    <NavLink className='expanded-logo' to={'/'}> <img src={expandedLogo} alt="logo image" /> </NavLink>
                    <ul className={`nav-links clean-list ${(isMenuOpen) ? 'open' : ''}`}>
                        {navLinks.map(navLink => {
                            return <NavLink key={navLink.path} className={(navData) => navData.isActive ? 'active' : ''} to={navLink.path}> <li>{navLink.txt}</li></NavLink>
                        })}
                    </ul>
                </nav>

                {/* MOBILE - user */}
                <div className="user-avatar">
                    <BiUserCircle className='user-avatar-icon' />
                </div>
            </div>
        </header>
    )
}