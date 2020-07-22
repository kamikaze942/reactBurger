import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import classes from './Orders.css'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount () {
        axios.get('orders.json').then((response)=>{
            let fetchedOrders = [];
            for(let key in response.data){
                fetchedOrders.push({...response.data[key], id: key})
            }
            this.setState({orders: fetchedOrders, loading: false})
        }).catch(error=>{
            this.setState({loading: false})            
        })
    }

    render() {
        let myorders = null;
        if(this.state.orders){
            myorders = this.state.orders.map(x=>{
                return <Order key={x.id} price={x.price} ingredients={x.ingredients} customer={x.customer} deliveryMethod={x.deliveryMethod} />
            })
        }
        return (
            <div className={classes.Orders}>
                {myorders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)
