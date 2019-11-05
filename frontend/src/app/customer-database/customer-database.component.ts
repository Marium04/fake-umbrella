import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { Customer } from '../models/customer';
import { CustomerService } from '../services/customer.service';
import { DeleteCustomerConfirmationComponent } from '../modals/delete-customer-confirmation/delete-customer-confirmation.component';
import { AddUpdateCustomerComponent } from '../modals/add-update-customer/add-update-customer.component';

@Component({
  selector: 'app-customer-database',
  templateUrl: './customer-database.component.html',
  styleUrls: ['./customer-database.component.less', '../global-style.less']
})
export class CustomerDatabaseComponent implements OnInit {
  private dataSource;
  resultsLength = 0;
  displayedColumns: string[] = ['Name',
    'Location',
    'Person of Contact',
    'Telephone Number',
    'Number of Employees',
    'Edit',
    'Delete'
    ];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initializeTable();
  }
  openDeleteCustomerDialog(customer: Customer): void {
    const self = this;
    const dialogRef = this.dialog.open(DeleteCustomerConfirmationComponent, {
      width: '600px',
      data: customer
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      self.initializeTable();
    });
  }
  openAddUpdateCustomerDialog(customer?: Customer): void {
    const self = this;
    if (!customer) {
      customer = {} as Customer;
    }
    const dialogRef = this.dialog.open(AddUpdateCustomerComponent, {
      width: '400px',
      data: customer
    });

    dialogRef.afterClosed().subscribe(result => {
      self.initializeTable();
    });
  }
  initializeTable(): void {
    const self = this;
    self.customerService.getAllCustomers().subscribe( (data: Customer[]) => {
      self.dataSource = new MatTableDataSource(data);
      self.resultsLength = data.length;
      this.dataSource.paginator = this.paginator;
    });
  }

}
