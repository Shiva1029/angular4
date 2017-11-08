import {Action} from '@ngrx/store';

import {RecruiterJobState} from './recruiter-job-state';

export const ADDJOB = 'ADDJOB';
export const GETJOB = 'GETJOB';

export class AddJobPost implements Action {
    readonly type = ADDJOB;

    constructor(public payload: RecruiterJobState) {
    }
}

export class GetJobPost implements Action {
    readonly type = GETJOB;
}

export type All = AddJobPost | GetJobPost;
