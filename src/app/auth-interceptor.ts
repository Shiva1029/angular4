import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/do';
import {HttpEvent, HttpResponse, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

function getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const changedReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + getCookie('token'))});
        return next.handle(changedReq);
          /*  .do(event => {
                if (event instanceof HttpResponse) {
                    console.log(getCookie('token'));
                }
            });
            */
    }
}
