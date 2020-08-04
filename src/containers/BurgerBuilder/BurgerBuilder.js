import React, { useState, useEffect, useCallback } from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const burgerBuilder = props => {

    const [purchasing, setIsPurchasing] = useState(false)
    
    const dispatch = useDispatch();

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    })

    const totalPrice = useSelector(state => {
        return state.burgerBuilder.totalPrice
    })
    
    const error  = useSelector(state => {
        return state.burgerBuilder.error
    })        

    const isAuth  = useSelector(state => {
        return state.auth.token !== null
    })        

    const onIngredientAdded = (name)=> dispatch(actions.addIngredient(name));
    const onIngredientRemoved = (name)=> dispatch(actions.removeIngredient(name));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()),[]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetRedirect = (path) => dispatch(actions.setAuthRedirect(path));

    useEffect(()=>{
        onInitIngredients()
    }, [onInitIngredients]);

    const purchaseHandler = () => {
        if(isAuth){
            setIsPurchasing(true);
        } else{
            onSetRedirect('/checkout');
            props.history.push('/auth');
        }
    }
    const cancelOrder = () => {
        setIsPurchasing(false);

    }

    const updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, curr)=>{ return curr + sum},0);
        return sum > 0
    }

    const purchaseContinueHandler = () =>{        
        onInitPurchase()
        props.history.push('/checkout')
    }


    const disabledInfo = {...ings}
    for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key]  <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>We are currently offline for maintenence</p> : <Spinner />;
    if(ings){
        burger = (
            <Aux>
                <Burger ingredients={ings}></Burger>
                <BuildControls 
                    price={totalPrice}
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    canOrder={updatePurchaseState(ings)}
                    order={purchaseHandler}
                    isAuth={isAuth}
                    disabled={disabledInfo}
                />
            </Aux>
        );
        orderSummary = <OrderSummary price={totalPrice} continue={purchaseContinueHandler} cancel={cancelOrder} ingredients={ings}/>
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={cancelOrder} >
                {orderSummary}
            </Modal>
                {burger}
        </Aux>
    )

}

// const mapDispatchToProps = dispatch =>{
//  return {
//      onIngredientAdded: (name)=> dispatch(actions.addIngredient(name)),
//      onIngredientRemoved: (name)=> dispatch(actions.removeIngredient(name)),
//      onInitIngredients: ()=> dispatch(actions.initIngredients()),
//      onInitPurchase: ()=> dispatch(actions.purchaseInit()),
//      onSetRedirect: (path)=> dispatch(actions.setAuthRedirect(path))
//  }
// }

// const mapStateToProps = state =>{
//     return {
//         ings: state.burgerBuilder.ingredients,
//         totalPrice: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuth: state.auth.token !== null
//     }
// }
export default withErrorHandler(burgerBuilder, axios)