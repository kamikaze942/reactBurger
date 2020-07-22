import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.25,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1
}


class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props)
    //     this.state ={
            
    //     }
    // }
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false, 
        purchasing: false,
        error: false

    }
    componentDidMount () {
        axios.get('ingredients.json').then((response)=>{
            this.setState({ingredients: response.data})
        }).catch(error=>{
            this.setState({error: true})            
        })
    }
    addIngredient = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const updatedPrice = INGREDIENT_PRICES[type] + this.state.totalPrice
        
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
        this.updatePurchaseState(updatedIngredients)
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    cancelOrder = () => {
        this.setState({purchasing: false});
    }
    updatePurchaseState (newInngredients){
        const ingredients = {
            ...newInngredients
        }
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum, curr)=>{ return curr + sum},0);
        this.setState({purchaseable: sum > 0})
    }
    removeIngredient = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount ? oldCount - 1 : 0;
        if(updatedCount <  0){
            return;
        } else{
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount;
            const updatedPrice =  this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
            this.updatePurchaseState(updatedIngredients)
        }
    }

    purchaseContinueHandler = (props) =>{        
        //this.cancelOrder()
        //alert('ordered!')

        // this.setState({loading: true})

        // setTimeout(()=>{
        //     this.setState({loading: false, purchasing: false})            
        // }, 2000)

        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push('/checkout')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render (){
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]  <= 0;
        }
        let orderSummary = null;

        let burger = this.state.error ? <p>We are currently offline for maintenence</p> : <Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}></Burger>
                    <BuildControls 
                        price={this.state.totalPrice}
                        ingredientAdded={this.addIngredient}
                        ingredientRemoved={this.removeIngredient}
                        canOrder={this.state.purchaseable}
                        purchaseable={this.state.purchaseable}
                        order={this.purchaseHandler}
                        disabled={disabledInfo}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary price={this.state.totalPrice} continue={this.purchaseContinueHandler} cancel={this.cancelOrder} ingredients={this.state.ingredients}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />

        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.cancelOrder} >
                    {orderSummary}
                </Modal>
                    {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)