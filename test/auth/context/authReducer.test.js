import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Test in authReducer', () => {
    const initialState = { logged:false };
    test('should return defaut state', () => {
        const state =  authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test('should call (login), authenticate user and set user', () => {
        const action = {
            type: types.login,
            payload: {
                user: 'Damián',
                company: 'AT'
            }
        }

        const state = authReducer(initialState, action);
        expect(state.logged).toBeTruthy();
        expect(state.user).toBe(action.payload);        
    });

    test('should call logout, remove user name and logged in false', () => {
        const state = {
            logged: true,
            user: {
                name: 'Damián',
                company: 'AT'
            }
        }
        const action = {
            type: types.logout
        }
        const newState = authReducer(state, action);
        expect(newState.logged).toBeFalsy();        
    });
    
});