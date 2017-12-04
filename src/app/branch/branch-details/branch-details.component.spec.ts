import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchDetailsComponent } from './branch-details.component';

describe('BranchDetailsComponent', () => {
  let component: BranchDetailsComponent;
  let fixture: ComponentFixture<BranchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
