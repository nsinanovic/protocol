import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputsComponent } from './inputs/inputs.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
  { path: 'inputs', component: InputsComponent }, 
  { path: 'statistics', component: StatisticsComponent }, 
  // otherwise redirect to home
  { path: '**', redirectTo: 'statistics' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
