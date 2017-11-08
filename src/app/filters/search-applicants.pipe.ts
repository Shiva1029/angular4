import {Pipe, PipeTransform} from '@angular/core';

import {ApplicantListObj} from '../recruiter-job-detail/applicant-list-obj';

@Pipe({
    name: 'searchApplicants'
})
export class SearchApplicantsPipe implements PipeTransform {
    transform(Applicants: ApplicantListObj[], searchText: string): any[] {
        if (!Applicants) {
            return [];
        }
        if (!searchText) {
            return Applicants;
        }
        searchText = searchText.toString().toLowerCase();
        return Applicants.filter(it => {
            return it.user_id.toString().includes(searchText) ||
                it.fname.toLowerCase().includes(searchText);
        });
    }
}