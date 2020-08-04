import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary =  props =>  { 

        const ingredientSummary = [];
        for (let i in props.ingredients){
          ingredientSummary.push(<li key={i}><span style={{textTransform: 'capitalize'}}>{i}</span>: {props.ingredients[i]} </li>);
        }
        return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delcious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>With a total price of : {props.price.toFixed(2)}</p>
            <p>Continue to checkout ? </p>
            <Button clicked={props.cancel} btnType="Danger">CANCEL</Button>
            <Button clicked={props.continue} btnType="Success">ORDER!</Button>
        </Aux>
        )

}

export default orderSummary
