import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    purchased: false,
    loading: false,
    error: false
}

const purchaseBurgerInit = (state, action) =>{
    return updateObject(state, {purchased: false})
}

const purchaseBurger = (state, action) =>{
    return updateObject(state, {loading: true})

}
const purchaseBurgerSuccess = (state, action) =>{
    const newOrder = {...action.orderData, id: action.id};
    return updateObject(state, {loading: false, orders: state.orders.concat(newOrder), purchased: true})    

}
const purchaseBurgerFail = (state, action) =>{
    return updateObject(state, {loading: false});
}
const fetchOrdersFail = (state, action) =>{
    return updateObject(state, {loading: false})
}
const fetchOrdersStart = (state, action) =>{
    return updateObject(state, {loading: true, orders: []})
}
const fetchOrdersSuccess = (state, action) =>{
    return updateObject(state, {loading: false, orders: state.orders.concat(action.orders)})    
}
const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        case actionTypes.PURCHASE_INIT:  return purchaseBurgerInit(state, action);
        case actionTypes.PURCHASE_BURGER: return purchaseBurger(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFail(state, action);
        default: return state
    }
}

export default reducer
