import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogIncomeComponent } from './delete-dialog-income.component';

describe('DeleteDialogIncomeComponent', () => {
  let component: DeleteDialogIncomeComponent;
  let fixture: ComponentFixture<DeleteDialogIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
