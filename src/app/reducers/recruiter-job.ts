import * as PostActions from './recruiter-job-actions';
import {RecruiterJobState} from './recruiter-job-state';

export type Action = PostActions.All;

const emptyJobState = {
    id: null,
    title: null,
    company: null,
    city: null,
    state: null,
    zip: null,
    time: null,
    visible: null,
};

const newState = (state, newData) => {
    return Object.assign({}, newData);
};

export function RecruiterJobReducer(state: RecruiterJobState = emptyJobState, action: Action) {
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