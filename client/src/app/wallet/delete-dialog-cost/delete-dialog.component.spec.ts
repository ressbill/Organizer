import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDealogComponent } from './delete-dialog.component';

describe('DeleteDealogComponent', () => {
  let component: DeleteDealogComponent;
  let fixture: ComponentFixture<DeleteDealogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDealogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDealogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
