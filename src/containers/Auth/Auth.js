import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Gigya from '../../components/Gigya/gigya';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

const auth = props =>{
    const { buildingBurger, redirectPath, onSetRedirect} = props;
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }        
    })
    const [isSignup, setIsSignup] = useState(true);

    useEffect(()=>{
        if(!buildingBurger && redirectPath !== '/'){
            onSetRedirect()
        }
    },[buildingBurger, onSetRedirect, redirectPath])
    


    const inputChangedHandler = (controlName, event) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        })
        setAuthForm(updatedControls);
    }    
    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }
    
    const switchAuthModeHandler = (event) =>{
        event.preventDefault();
        setIsSignup(!isSignup);
        // this.setState(prevState =>{
        //     return {
        //         isSignup: !prevState.isSignup
        //     }
        // })
    }

        const formElementsArray = [];
        for(let key in authForm){
            formElementsArray.push(
                {
                    id: key, 
                    config: authForm[key]
                });
        }

        let form = formElementsArray.map(formElement =>(
             <Input key={formElement.id}
                          elementConfig={formElement.config.elementConfig} 
                          value={formElement.config.value}
                          invalid={!formElement.config.valid}
                          shouldValidate={formElement.config.validation}
                          touched={formElement.config.touched}
                          changed={inputChangedHandler.bind(this, formElement.id)} />            
                        
        ));
        if(props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(props.error){
            errorMessage = (
                <p>{props.error.message}</p>
            );
        }
        let authRedirect = null;
        if (props.isAuth){
            authRedirect = <Redirect to={props.redirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                    <Button 
                        clicked={switchAuthModeHandler}
                        btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>

                    
                </form>
                <Gigya />
            </div>
        )

}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        redirectPath: state.auth.authRedirect,
        buildingBurger: state.burgerBuilder.building
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (email, password, isSignup)=> dispatch(actions.authInit(email, password, isSignup)),
        onSetRedirect: () => dispatch(actions.setAuthRedirect('/'))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(auth)
