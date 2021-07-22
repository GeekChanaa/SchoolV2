import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const AppRoutes: Routes= [
    {},
]

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule{
}
