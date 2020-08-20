import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';


const checkout = props => {


    const checkoutCancelledHandler = () =>{
        props.history.goBack();
    }
    const checkoutContinuedHandler = () => {
        props.history.replace('/burger/checkout/contact-data')
    }

    let summary = <Redirect to="/" />

    if(props.ings){
        const purchased = props.purchased ? <Redirect to="/" /> : null;
        summary = (<div>
                    {purchased}
                    <CheckoutSummary  checkoutCancelled={checkoutCancelledHandler} 
                            checkoutContinued={checkoutContinuedHandler} 
                            ingredients={props.ings} />
                    <Route path={props.match.path + '/contact-data'} 
                            component={ContactData} />
                </div>
        );
    }
    return summary
    
}

const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(checkout)
