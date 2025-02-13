import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./buyer-dashboard/buyer-dashboard.component').then((m) => m.BuyerDashboardComponent)
      },
      {
        path: 'view',
        loadComponent: () => import('./view-requirements/view-requirements.component').then((m) => m.ViewRequirementsComponent),
        pathMatch: 'full'
      },
      {
        path: 'farmer-connections',
        loadComponent: () => import('../../pages/marketplace/marketplace.component').then((m) => m.MarketplaceComponent),
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerElementsRoutingModule { }
