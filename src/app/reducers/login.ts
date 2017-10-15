import {Action} from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function loginReducer(state: boolean = false, action: Action) {
    switch (action.type) {
        case LOGIN:
            return true;

        case LOGOUT:
            return false;

        default:
            return state;
    }
}