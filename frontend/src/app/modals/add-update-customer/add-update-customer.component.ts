import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatError } from '@angular/material';
import { Customer } from '../../models/customer';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-add-update-customer',
  templateUrl: './add-update-customer.component.html',
  styleUrls: ['./add-update-customer.component.less']
})
export class AddUpdateCustomerComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert = 'This field is required';
  editMode = false;
  constructor(
    public dialogRef: MatDialogRef<AddUpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private customerService: CustomerService,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
    if (Object.keys(this.data).length === 0) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }
  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      person_of_contact: [this.data['Person of Contact'] ? {value: this.data['Person of Contact']} : null, Validators.required],
      telephone_number: [this.data['Telephone Number'] ? {value: this.data['Telephone Number']} : null,
      [Validators.required, Validators.pattern(new RegExp(/\d[-]\d{3}[-]\d{3}[-]\d{4}/))]],
      location: [this.data.Location ? {value: this.data.Location} : null, Validators.required],
      no_of_employees: [this.data['Number of Employees'] ? {value: this.data['Number of Employees']} : null,
      [Validators.required, Validators.pattern(new RegExp(/^[0-9]*$/)), Validators.max(10000)]]
    });
    if (this.data.Name) {
      this.name.setValue(this.data.Name);
    }
    if (this.data['Person of Contact']) {
      this.person_of_contact.setValue(this.data['Person of Contact']);
    }
    if (this.data['Telephone Number']) {
      this.telephone_number.setValue(this.data['Telephone Number']);
    }
    if (this.data.Location) {
      this.location.setValue(this.data.Location);
    }
    if (this.data['Number of Employees']) {
      this.no_of_employees.setValue(this.data['Number of Employees']);
    }
  }
  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  get person_of_contact() {
    return this.formGroup.get('person_of_contact') as FormControl;
  }
  get telephone_number() {
    return this.formGroup.get('telephone_number') as FormControl;
  }
  get location() {
    return this.formGroup.get('location') as FormControl;
  }
  get no_of_employees() {
    return this.formGroup.get('no_of_employees') as FormControl;
  }
  onSubmit(post) {
    const cust: Customer = {
      Name: post.name,
      'Person of Contact': post.person_of_contact,
      'Number of Employees': post.no_of_employees,
      Location: post.location,
      'Telephone Number': post.telephone_number
    };
    if (this.editMode) {
      cust._id = this.data._id;
      this.customerService.updateCustomerById(cust).subscribe((res: any) => {
        console.log(res.message);
        this.dialogRef.close();
      });
    } else {
      this.customerService.addNewCustomer(cust).subscribe((res: any) => {
        console.log(res.message);
        this.dialogRef.close();
      });
    }
  }

}
