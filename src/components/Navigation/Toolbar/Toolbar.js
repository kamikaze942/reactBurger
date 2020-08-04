import React from 'react'
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import HamburgerMenu from '../../UI/HamburgerMenu/HamburgerMenu'
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <header  className={classes.Toolbar}>
            <HamburgerMenu clicked={props.clicked} />
            <div className={classes.Logo}>
              <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    )
}

export default Toolbar
