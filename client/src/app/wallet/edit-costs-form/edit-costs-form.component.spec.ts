import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCostsFormComponent } from './edit-costs-form.component';

describe('EditCostsFormComponent', () => {
  let component: EditCostsFormComponent;
  let fixture: ComponentFixture<EditCostsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCostsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCostsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
