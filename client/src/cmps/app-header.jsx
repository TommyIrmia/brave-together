import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

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

                {/* dark screen */}
                <div className={`screen-overlay ${(isMenuOpen) ? 'open' : ''}`} onClick={() => {
                 toggleMenu()
                }}></div>

                {/* hamburger button */}
                <button className="hamburger-btn" onClick={() => {
                    toggleMenu()
                }}>
                    <GiHamburgerMenu className="hamburger-icon" />
                </button>

                <img className='mobile-display small-logo' src={logo} alt="" />

                {/* links */}
                <nav className="nav-container">
                    <NavLink className='expanded-logo' to={'/'}> <img src={expandedLogo} alt="logo image" /> </NavLink>
                    <ul className={`nav-links clean-list ${(isMenuOpen) ? 'open' : ''}`}>
                        <NavLink className={(navData) => navData.isActive ? 'active' : ''} to={'/'}> <li>ראשי</li></NavLink>
                        <NavLink className={(navData) => navData.isActive ? 'active' : ''} to={'/about'}> <li>אודות</li></NavLink>
                        <NavLink className={(navData) => navData.isActive ? 'active' : ''} to={'/story'}> <li>שמורים</li></NavLink>
                        <NavLink className={(navData) => navData.isActive ? 'active' : ''} to={'/quote'}> <li>פרוייקטים נוספים</li></NavLink>
                        <NavLink className={(navData) => navData.isActive ? 'active' : ''} to={'/collection'}> <li>פעילויות העמותה</li></NavLink>
                        <NavLink className={(navData) => navData.isActive ? 'active' : ''} to={'/ori'}> <li>לתרומות</li></NavLink>
                        <NavLink className={(navData) => navData.isActive ? 'active' : ''} to={'/bori'}> <li>הגדרות</li></NavLink>
                    </ul>
                </nav>

                {/* MOBILE - user */}
                <div className="user-avatar">
                    {/* should we realy write it? */}
                    {/* <p className='mobile-display'>שלום אורח</p> */}
                   <BiUserCircle className='user-avatar-icon'/>
                </div>
        </header>
    )
}


{/* <header className="app-header">
      <div className="user-container">User</div>
      <div className="logo">logo</div>
      <div className="nav-btn" onClick={onToggleModal}>=</div>

      <nav className={"navbar-container " + (isNavOpen ? 'open' : '')}>
            <div className="nav-item">אודות</div>
            <div className="nav-item">שמורים</div>
            <div className="nav-item">פרוייקטים נוספים</div>
            <div className="nav-item">פעילויות העמותה</div>
            <div className="nav-item">לתרומות</div>
            <div className="nav-item">הגדרות</div>
      </nav>
    </header> */}























// class Header extends React.Component {
  
//   constructor(props) {
//     super(props);

//     this.state = {
//       isSignedIn: false
//     }
//   }

//   componentDidMount() {
//     let token = localStorage.getItem('token');
      
//     if(token) {
//       this.setState({ isSignedIn: true });
//     }

//     else {
//       this.setState({ isSignedIn: false });
//     }
//   }

//   render() {

//     return (
//       <div className="header-container">
//         <nav className="navbar navbar-expand-lg">
//           <ul>
//             <li className="nav-item">
//               <NavLink className="nav-link link-dark" to="/signup">
//                 הירשם
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link link-dark" to="/login">
//                 התחבר
//               </NavLink>
//             </li>
//             {/* <li>
//               <NavLink className="nav-link" to="/">
//                 התנתק
//               </NavLink>
//             </li> */}
//             <li className="nav-item">
//               <NavLink className="nav-link link-dark" to="/">
//                 בית
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link link-dark" to="/about">
//                 אודות
//               </NavLink>
//             </li>
//             {/* <li className="nav-item">
//               <NavLink className="nav-link link-dark" to="/">
//                 עיצוב ציטוט
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link link-dark" to="/">
//                 הוספת סיפור
//               </NavLink>
//             </li> */}
//           </ul>
//           <ul>
//             <li className="nav-item">
//               <NavLink to="/">
//                 <img
//                   src="https://brave-together.com/wp-content/uploads/2020/04/%D7%A2%D7%95%D7%AA%D7%A7-%D7%A9%D7%9C-Copy-of-%D7%9C%D7%95%D7%92%D7%95-%D7%97%D7%93%D7%A9-%D7%A8%D7%A7%D7%A2-%D7%A9%D7%A7%D7%95%D7%A3.png"
//                   alt="לוגו"
//                 ></img>
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     );
//   }
// };

// export default Header;
