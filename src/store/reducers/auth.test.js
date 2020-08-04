import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', ()=>{
    it('should return initial state', ()=>{
        expect(reducer(undefined,{})).toEqual({
            token: null, 
            error: null,
            loading: false,
            userId: null,
            authRedirect: '/'
        });
    });
    it('should store the token up login', ()=>{
        expect(reducer({
            token: null, 
            error: null,
            loading: false,
            userId: null,
            authRedirect: '/'
        },
        {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'sometoke', userId:'mark'
        })).toEqual({
            token: 'sometoke', 
            error: null,
            loading: false,
            userId: 'mark',
            authRedirect: '/'
        });
    });    

})