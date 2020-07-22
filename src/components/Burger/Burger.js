import React from 'react';

import { withRouter } from 'react-router-dom';
import Ingredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css';
import Aux from '../../hoc/Aux/Aux';

const burger = (props) =>{
    console.log(props)
    let transformedIngredients = Object.keys( props.ingredients )
    .map( igKey => {
        return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
            return <Ingredient key={igKey + i} type={igKey} />;
        } );
    } )
    .reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <Aux>
            <div className={classes.Burger}>
                <Ingredient type="bread-top"></Ingredient>
                {transformedIngredients}
                <Ingredient type="bread-bottom"></Ingredient>
            </div>
            <div>{props.price}</div>
        </Aux>
    );
}

export default withRouter(burger);