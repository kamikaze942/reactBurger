import { delay } from 'redux-saga/effects'
import { put, call } from 'redux-saga/effects'

import axios from 'axios';
import * as actions from '../actions';

export function* logoutSaga(action){
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    yield put(actions.logoutSucceed())
}

export function* checkAuthTimeoutSaga(action){
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());

}

export function* authUserSaga(action){
        yield put(actions.authStart());
        const body = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        }
        const signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLc8uZTdBLnoZNOE4_EdqstSoSWz1BAQ0';
        const loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCLc8uZTdBLnoZNOE4_EdqstSoSWz1BAQ0';

        let url = loginUrl;
        if(action.isSignup){
            url = signUpUrl;
        }
        try{
            const response = yield axios.post(url, body);

            if(response && response.data){
                const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
                yield localStorage.setItem('token', response.data.idToken);
                yield localStorage.setItem('userId', response.data.localId);
                yield localStorage.setItem('expirationDate', expirationDate);

                yield put(actions.authSuccess(response.data.idToken, response.data.localId))
                yield put(actions.checkAuthTimeout(response.data.expiresIn));
            } else{
                yield put(actions.authFail({message: 'user not found', status: 404}))                
            }

        } catch(error){
            debugger;
            yield put(actions.authFail(error.response.data.error))
        };        
}

// export function* authCheckStateSaga(action){
//     const token = yield localStorage.getItem('token');
//     if(!token){
//         yield put(actions.logout());
//     } else{
//         const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
//         if(expirationDate > new Date()){
//             const userId = yield localStorage.getItem('userId');
//             yield put(actions.authSuccess(token, userId));
//             //minus current time from expire time so you know in how many ms it will fire off the logout 
//             yield put(actions.checkAuthTimeout(
//                 (expirationDate.getTime() - new Date().getTime()) / 1000 )
//             );
//         } else{
//             yield put(actions.logout());
//         }
//     }    
// }

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
      yield put(actions.logout());
    } else {
      const expirationDate = yield new Date(
        localStorage.getItem("expirationDate")
      );
      if (expirationDate <= new Date()) {
        yield put(actions.logout());
      } else {
        const userId = yield localStorage.getItem("userId");
        yield put(actions.authSuccess(token, userId));
        yield put(
          actions.checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  }