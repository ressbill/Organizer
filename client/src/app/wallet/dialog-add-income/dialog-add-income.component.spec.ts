import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddIncomeComponent } from './dialog-add-income.component';

describe('DialogAddIncomeComponent', () => {
  let component: DialogAddIncomeComponent;
  let fixture: ComponentFixture<DialogAddIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
