import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LogoutService {

    url = 'http://localhost/collegestash/logout.php';

    constructor(private http: HttpClient) {
    }

    submitUser(): Observable<any> {
        return this.http.post(this.url, {});
    }

}
