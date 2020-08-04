import React, { useEffect } from 'react'
import Order from '../../components/Order/Order';
import classes from './Orders.css'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const orders = props =>  {
    const { onFetchOrders } = props;
    
    useEffect(()=>{
        onFetchOrders(props.token, props.userId)
    },[onFetchOrders])


    let myorders = <Spinner />;
    if(!props.loading){
        myorders = props.orders.map(x=>{
            return <Order key={x.id} price={x.price} ingredients={x.ingredients} customer={x.customer} deliveryMethod={x.deliveryMethod} />
        })
    }

    return (
        <div className={classes.Orders}>
            {myorders}
        </div>
    )

}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders: (token, userId)=> dispatch(actions.fetchOrders(token, userId))
    }
   }
   
   const mapStateToProps = state =>{
       return {
           orders: state.order.orders,
           loading: state.order.loading,
           token: state.auth.token,
           userId: state.auth.userId
       }
   }

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios))
