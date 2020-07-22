import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm: {
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
                    maxLength: 5
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
                    required: true
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
        },
        formIsValid: false,
        loading: false        
    }

    checkValidity(value, rules){
        let isValid = true;
        if(!rules){
            return true
        }
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid
    }

    submitFormHandler = (event) =>{
        event.preventDefault();

        this.setState({loading: true})
        const orderForm = {};
        for(let x in this.state.orderForm){
            orderForm[x] = this.state.orderForm[x].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderForm
        }
        console.log(order);
        axios.post('orders.json', order).then((response) =>{
            this.setState({loading: false})
            this.props.history.push('/`')
        }).catch(error=>{
            console.log(error);
            this.setState({loading: false})
        });
    }

    inputChangedHandler = (inputIdentifier, event) =>{
        const updatedOrderForm = {
            ...this.state.orderForm,

        }

        const updatedFormInput = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormInput.value = event.target.value;
        updatedFormInput.touched = true;
        updatedFormInput.valid = this.checkValidity(updatedFormInput.value, updatedFormInput.validation);

        let formIsValid = true;
        for(let inputs in updatedOrderForm){
            formIsValid = updatedOrderForm[inputs].valid && formIsValid;
        }
        updatedOrderForm[inputIdentifier]  = updatedFormInput;
        this.setState({orderForm: updatedOrderForm, formIsValid});
        
    }

    render (){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push(
                {
                    id: key, 
                    config: this.state.orderForm[key]
                });
        }

        let form = (
            <form onSubmit={this.submitFormHandler}>
                {formElementsArray.map(formElement => (
                    <Input elementType={formElement.config.elementType} 
                        key={formElement.id} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={this.inputChangedHandler.bind(this, formElement.id)} />
                ))}
                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>            
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData