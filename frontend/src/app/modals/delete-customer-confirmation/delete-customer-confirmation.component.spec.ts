import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCustomerConfirmationComponent } from './delete-customer-confirmation.component';

describe('DeleteCustomerConfirmationComponent', () => {
  let component: DeleteCustomerConfirmationComponent;
  let fixture: ComponentFixture<DeleteCustomerConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCustomerConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCustomerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
