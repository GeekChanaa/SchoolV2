import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';
import { DashboardComponent } from './dashboard/dashboard.component';

export const AppRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        loadChildren: () => import('./dashboard/dashboard.module')
            .then(m => m.DashboardModule),
    },
    {
        path: 'auth',
        component: AuthComponent,
        loadChildren: () => import('./auth/auth.module')
            .then(m => m.AuthModule),
    }
]

@NgModule({
    imports: [RouterModule.forRoot(AppRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
