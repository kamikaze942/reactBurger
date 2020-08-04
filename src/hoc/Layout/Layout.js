import React, { useState } from 'react'
import Aux from '../Aux/Aux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const layout = props => {
    const [showSideDrawer, setDrawer] = useState(false);
    const sideDrawerToggle = () =>{
        setDrawer(!showSideDrawer)
    }

    return(
        <Aux>
            <Toolbar isAuth={props.isAuth} clicked={sideDrawerToggle} />
            <SideDrawer isAuth={props.isAuth} open={showSideDrawer} closed={sideDrawerToggle} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}
const mapStateToProps = state =>{
    return {
        isAuth: state.auth.token
    }
}
export default connect(mapStateToProps, null)(layout);