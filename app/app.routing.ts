import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }, {
      path: '',
      component: AdminLayoutComponent,
      children: [
          {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    }, {
        path: 'components',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
    }, {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.Forms)
    },
    {
      path: 'enseignant',
      loadChildren: () => import('./enseignant/enseignant.module').then(m => m.EnseignantModule)
    },
    {
      path: 'contrat',
      loadChildren: () => import('./contrats/contrats.module').then(m => m.ContratsModule)
    },
    {
      path: 'equipe',
      loadChildren: () => import('./equipe/equipe.module').then(m => m.EquipeModule)
    },
    {
    path: 'detail-equipe',
    loadChildren: () => import('./detailEquipe/detail-equipe.module').then(m => m.DetailEquipeModule)
    },
    {
      path: 'universite',
      loadChildren: () => import('./universite/universite.module').then(m => m.UniversiteModule)
    },
    {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
    },
    {
      path: 'etudiant',
      loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule)
  },
  {
    path: 'departement',
    loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule)
  },
    // {
    //    path: 'maps',
    //    loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
    //},
    // {
    //    path: 'widgets',
    //    loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
    //},
    // {
    //     path: 'charts',
    //     loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    // },
     {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule)
    }, {
        path: '',
        loadChildren: () => import('./userpage/user.module').then(m => m.UserModule)
    }, {
        path: '',
        loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
    }
  ]}, {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }]
    }
];
