import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component { 
    // componentWillUpdate(){
    //     console.log('order summary updated')    
    // }
    render(){
        const ingredientSummary = [];
        for (let i in this.props.ingredients){
          ingredientSummary.push(<li key={i}><span style={{textTransform: 'capitalize'}}>{i}</span>: {this.props.ingredients[i]} </li>);
        }
        return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delcious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>With a total price of : {this.props.price.toFixed(2)}</p>
            <p>Continue to checkout ? </p>
            <Button clicked={this.props.cancel} btnType="Danger">CANCEL</Button>
            <Button clicked={this.props.continue} btnType="Success">ORDER!</Button>
        </Aux>
        )
    }


}

export default OrderSummary
