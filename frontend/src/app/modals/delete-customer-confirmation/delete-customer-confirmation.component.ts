import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
@Component({
  selector: 'app-delete-customer-confirmation',
  templateUrl: './delete-customer-confirmation.component.html',
  styleUrls: ['./delete-customer-confirmation.component.less']
})
export class DeleteCustomerConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private customerService: CustomerService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.customerService.deleteCustomerById(this.data._id).subscribe((status) => {
      console.log(status);
    });
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
