import React from 'react';
import NavBar from './NavBar';

const NavBarMenu = ({ isOpen, setBurgerMenu, userEmail, onSignOut }) => {
    return (
        // <NavBar isOpen={burgerMenu}>
            <div className="navbar__menu">
                <button className="navbar__button-menu" onClick={() => setBurgerMenu(true)}>
                    <span></span>
                </button>
                <ul className={`navbar__nav  ${isOpen && "navbar__nav_open"}`}>
                    <li className="navbar__link">{userEmail}</li>
                    <li><button onClick={onSignOut} className="navbar__link navbar__button">Выйти</button></li>
                </ul>
            </div>
        // </NavBar>
    )
}

export default NavBarMenu;