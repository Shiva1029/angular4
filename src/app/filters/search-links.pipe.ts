import {Pipe, PipeTransform} from '@angular/core';

import {LinksState} from './links-state';

@Pipe({
    name: 'searchLinks'
})
export class SearchLinksPipe implements PipeTransform {
    transform(links: LinksState[], searchText: string): any[] {
        if (!links) {
            return [];
        }
        if (!searchText) {
            return links;
        }
        searchText = searchText.toString().toLowerCase();
        return links.filter(it => {
            return it.title.toLowerCase().includes(searchText) ||
                it.link.toLowerCase().includes(searchText) || it.meanings.indexOf(searchText) > 0;
        });
    }
}