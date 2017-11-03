import * as PostActions from './job-actions';
import {JobState} from './job-state';

export type Action = PostActions.All;

const emptyJobState = {
    id: null,
    title: null,
    company: null,
    city: null,
    state: null,
    zip: null,
    time: null,
    apply: null,
};

const newState = (state, newData) => {
   // return Object.assign({}, state, newData);
    return Object.assign({}, newData);
};

export function jobReducer(state: JobState = emptyJobState, action: Action) {
    switch (action.type) {
        case PostActions.ADDJOB: {
            return newState(state, action.payload);
        }
        case PostActions.GETJOB: {
            return Object.assign({}, state);
        }
        default: {
            return Object.assign({}, state);
        }
    }
}