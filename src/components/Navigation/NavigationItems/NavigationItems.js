import React from 'react'
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/burger">Burger Builder</NavigationItem>
            { props.isAuth ? <NavigationItem link="/burger/orders">Orders</NavigationItem> : null }
            { !props.isAuth ? <NavigationItem link="/burger/auth">Sign In</NavigationItem> : <NavigationItem link="/logout">Log out</NavigationItem>}
            
        </ul>
    )
}


export default NavigationItems
