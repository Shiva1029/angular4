import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'

import { userRegForm }  from './user.registrationForm';
import { userRegPage }  from './user.registrationPage';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ userRegPage, userRegForm ],
  bootstrap:    [ userRegPage, userRegForm ]
})
export class AppModule { }
