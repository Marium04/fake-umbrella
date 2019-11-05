import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getAllCustomers() {
    return this.http.get('http://localhost:3000/getCustomers');
  }
  deleteCustomerById(id: string) {
    console.log('cust id', id);
    return this.http.delete(`http://localhost:3000/deleteCustomerById/${id}`);
  }
  addNewCustomer(customer: Customer) {
    return this.http.post(`http://localhost:3000/addCustomer`, {customer});
  }
  updateCustomerById(customer: Customer) {
    return this.http.put(`http://localhost:3000/updateCustomerById/${customer._id}`, {customer});
  }
  getRainForecast() {
    return this.http.get('http://localhost:3000/forecast-rain');
  }
  getTop4Customers() {
    return this.http.get('http://localhost:3000/getTop4Customers');
  }
}
