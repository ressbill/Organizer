import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCostComponent } from './dialog-add-cost.component';

describe('DialogAddCostComponent', () => {
  let component: DialogAddCostComponent;
  let fixture: ComponentFixture<DialogAddCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
