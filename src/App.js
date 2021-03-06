import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';


import Logout  from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import Auth from './containers/Auth/Auth';

const Checkout = React.lazy(()=> {
  return import('./containers/Checkout/Checkout')
});

const Orders = React.lazy(()=> {
  return import('./containers/ Orders/Orders')
});

// const Auth = React.lazy(()=> {
//   return import('./containers/Auth/Auth')
// });
const app = props => {
  const { onTryAutoSignUp } = props;
  useEffect(()=>{
    onTryAutoSignUp()
  }, [onTryAutoSignUp])
  
  let routes = (
    <Switch>
      <Route path="/burger/auth" render={(props)=> <Auth {...props}/>} />
      <Route path="/burger/" exact component={BurgerBuilder} />
      <Redirect to="/burger/" />
    </Switch>

  );
  
  if(props.isAuth){
    routes = (
      <Switch>
        <Route path="/burger/checkout" render={(props)=> <Checkout {...props} /> } />
    <Route path="/burger/orders" render={(props) => <Orders {...props} /> } />
        <Route path="/burger/logout" render={(props) => <Logout {...props} /> } />
        <Route path="/burger/auth" render={(props)=> <Auth  {...props} /> } />
        <Route path="/burger/" exact component={BurgerBuilder} />
        <Redirect to="/burger/" />
      </Switch>

    );
  }

  return (
    <div>
      <Layout >
          <Suspense fallback={<p>Loading....</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
  
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}
const mapStateToProps = state =>{
  return {
    isAuth: state.auth.token !== null
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app)); 
