import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDatabaseComponent } from './customer-database/customer-database.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatIconModule, MatPaginatorModule, MatDialogModule, MatButtonModule,
  MatInputModule, MatCheckboxModule } from '@angular/material';
import { DeleteCustomerConfirmationComponent } from './modals/delete-customer-confirmation/delete-customer-confirmation.component';
import { AddUpdateCustomerComponent } from './modals/add-update-customer/add-update-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForecastRainComponent } from './forecast-rain/forecast-rain.component';
import { DisplayGraphComponent } from './display-graph/display-graph.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerDatabaseComponent,
    DeleteCustomerConfirmationComponent,
    AddUpdateCustomerComponent,
    ForecastRainComponent,
    DisplayGraphComponent
  ],
  entryComponents: [DeleteCustomerConfirmationComponent, AddUpdateCustomerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
