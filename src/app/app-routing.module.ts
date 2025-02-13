import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { FarmerComponent } from './theme/layout/farmer/farmer.component';
import { BuyerComponent } from './theme/layout/buyer/buyer.component';

const routes: Routes = [

  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth'
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/authentication/authentication.module').then((m) => m.AuthenticationModule)

      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      // {
      //   path: 'admin',
      //   redirectTo: 'admin/dashboard',
      //   pathMatch: 'full'
      // },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent)
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then((m) => m.FormElementsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./demo/pages/tables/tables.module').then((m) => m.TablesModule)
      }
    ]
  },
  {
    path: 'farmer',
    component: FarmerComponent,

    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadComponent: () => import('./components/farmer/farmer-dashboard/farmer-dashboard.component').then((m) => m.FarmerDashboardComponent),
      },

      {
        path: 'view-cultivations',
        loadComponent: () => import('./components/farmer/view-cultivations/view-cultivations.component').then((m) => m.ViewCultivationsComponent),
        // loadChildren: () => import('./components/farmer/farmer-elements.module').then((m) => m.FarmerElementsModule),
      },
      {
        path: 'view-listings',
        loadComponent: () => import('./components/farmer/view-listings/view-listings.component').then((m) => m.ViewListingsComponent),
        // loadChildren: () => import('./components/farmer/farmer-elements.module').then((m) => m.FarmerElementsModule),
      },


      {
        path: 'marketplace',
        loadComponent: () =>
          import('./pages/marketplace/marketplace.component').then(
            (m) => m.MarketplaceComponent
          ),
      },

      {
        path: 'market-insights',
        loadComponent: () =>
          import('./components/market-insights/market-insights.component').then(
            (m) => m.MarketInsightsComponent
          ),
      },
      {
        path: 'financial-overview',
        loadComponent: () =>
          import('./components/market-insights/market-insights.component').then(
            (m) => m.MarketInsightsComponent
          )
      }
    ]
  },
  {
    path: 'buyer',
    component: BuyerComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./components/buyer/buyer-dashboard/buyer-dashboard.component').then((m) => m.BuyerDashboardComponent),

      },
      {
        path: 'view-requirements',
        loadComponent: () => import('./components/buyer/view-requirements/view-requirements.component').then((m) => m.ViewRequirementsComponent),
      },
      {
        path: 'marketplace',
        loadComponent: () => import('./pages/marketplace/marketplace.component').then((m) => m.MarketplaceComponent)
      },
      {
        path: 'market-insights',
        loadComponent: () =>
          import('./components/market-insights/market-insights.component').then(
            (m) => m.MarketInsightsComponent
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
