import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterJobDetailComponent } from './recruiter-job-detail.component';

describe('RecruiterJobDetailComponent', () => {
  let component: RecruiterJobDetailComponent;
  let fixture: ComponentFixture<RecruiterJobDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterJobDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterJobDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
