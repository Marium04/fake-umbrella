import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDatabaseComponent } from './customer-database/customer-database.component';
import { ForecastRainComponent } from './forecast-rain/forecast-rain.component';
import { DisplayGraphComponent } from './display-graph/display-graph.component';


const routes: Routes = [
  {
    path: 'customer',
    component: CustomerDatabaseComponent
  },
  {
    path: 'forecast',
    component: ForecastRainComponent
  },
  {
    path: 'graph',
    component: DisplayGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
