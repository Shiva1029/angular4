import {Action} from '@ngrx/store';

import {JobState} from './job-state';

export const ADDJOB = 'ADDJOB';
export const GETJOB = 'GETJOB';

export class AddJobPost implements Action {
    readonly type = ADDJOB;

    constructor(public payload: JobState) {
    }
}

export class GetJobPost implements Action {
    readonly type = GETJOB;
}

export type All = AddJobPost | GetJobPost;
