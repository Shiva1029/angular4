import {Pipe, PipeTransform} from '@angular/core';

import {JobState} from '../reducers/job-state';

@Pipe({
    name: 'searchJobs'
})
export class SearchJobsPipe implements PipeTransform {
    transform(jobs: JobState[], searchText: string): any[] {
        if (!jobs) {
            return [];
        }
        if (!searchText) {
            return jobs;
        }
        searchText = searchText.toLowerCase();
        return jobs.filter(it => {
            return it.title.toLowerCase().includes(searchText) ||
                it.company.toLowerCase().includes(searchText) || it.city.toLowerCase().includes(searchText) ||
                it.state.toLowerCase().includes(searchText) || it.zip.toString().toLowerCase().includes(searchText);
        });
    }
}