import {Action} from '@ngrx/store';

export const ADDJOB = 'ADDJOB';

export function jobReducer(state: boolean = false, action: Action) {
    switch (action.type) {
        case ADDJOB:
            return true;

        default:
            return false;
    }
}