import React, { useState } from 'react'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const contactData = props => {
    const [orderForm, setOrderForm] = useState({
        name:{
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Jane Doe"
            },
            value:  '',
            validation: {
                required: true
            }, 
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "21 Jump street"
            },
            value:  '',
            validation: {
                required: true
            }, 
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "76021"
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
    
            }, 
            valid: false,
            touched: false                
        }, 
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "USA"
            },
            value:  '',
            validation: {
                required: true
            }, 
            valid: false,
            touched: false                
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: "test@test.com"
            },
            value:  '',
            validation: {
                required: true,
                isEmail: true
            }, 
            valid: false,
            touched: false                
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'}
                ],
                placeholder: "Jane Doe"
            },
            value:  'cheapest',
            valid: true
        }
    });
    const [formIsValid, setFormValid] = useState(false);

    const submitFormHandler = (event) =>{
        event.preventDefault();
        const formData = {};
        for(let x in orderForm){
            formData[x] = orderForm[x].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token);

    }

    const inputChangedHandler = (inputIdentifier, event) =>{


        const updatedFormInput = updateObject(orderForm[inputIdentifier],{
            value: event.target.value,
            touched: true, 
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation)
        });

        const updatedOrderForm = updateObject(orderForm, {
                [inputIdentifier]: updatedFormInput
            })

        let formValidity = true;
        for(let inputs in updatedOrderForm){
            formValidity = updatedOrderForm[inputs].valid && formValidity;
        }
        updatedOrderForm[inputIdentifier]  = updatedFormInput;
        setOrderForm(updatedOrderForm);
        setFormValid(formValidity);

        
    }

    const formElementsArray = [];
    for(let key in orderForm){
        formElementsArray.push(
            {
                id: key, 
                config: orderForm[key]
            });
    }

    let form = (
        <form onSubmit={submitFormHandler}>
            {formElementsArray.map(formElement => (
                <Input elementType={formElement.config.elementType} 
                    key={formElement.id} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={inputChangedHandler.bind(this, formElement.id)} />
            ))}
            <Button disabled={!formIsValid} btnType="Success">ORDER</Button>
        </form>            
    );
    if(props.loading){
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
    
}
const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading, 
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(contactData)