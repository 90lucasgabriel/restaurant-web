import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchFormComponent } from './branch-form.component';

describe('BranchFormComponent', () => {
  let component: BranchFormComponent;
  let fixture: ComponentFixture<BranchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
