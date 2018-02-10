// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {AuthInterceptor} from '../app/auth-interceptor';

export const StoreTools = StoreDevtoolsModule.instrument({
    maxAge: 25
});

export const Intercepts = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};

export const environment = {
    production: false,
    baseUrl: 'http://localhost/collegestash/'
};
