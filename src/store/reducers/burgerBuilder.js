import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 4,
    building: false
}
const INGREDIENT_PRICES = {
    salad: 0.25,
    bacon: 0.5,
    cheese: 0.4,
    meat: 1
}

const addIngredient = (state, action) =>{
    const newIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] + 1});
    return updateObject(state, {ingredients: newIngredients, 
                                totalPrice: INGREDIENT_PRICES[action.ingredientName] + state.totalPrice,
                                building: true
                            })
}

const removeIngredient = (state, action) =>{
    const newIngredients = updateObject(state.ingredients, {[action.ingredientName]: state.ingredients[action.ingredientName] ? state.ingredients[action.ingredientName] - 1 : 0});
    return updateObject(state, {ingredients: newIngredients, 
                                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                                building: true
                            })
}

const setIngredients = (state, action) =>{
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const fetchIngredientsFailed = (state, action) =>{
    return updateObject(state, {error: true})
}
const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action)
        default: return state
    }
}

export default reducer
