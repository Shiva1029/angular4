import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegPageComponent } from './user-reg-page.component';

describe('UserRegPageComponent', () => {
  let component: UserRegPageComponent;
  let fixture: ComponentFixture<UserRegPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
