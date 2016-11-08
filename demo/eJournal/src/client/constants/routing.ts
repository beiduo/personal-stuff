import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from '../components/list';
import { ViewComponent } from '../components/view';
import { EditComponent } from '../components/edit';
import { NotFoundComponent } from '../components/notFound';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'list/:page',
        component: ListComponent
    },
    {
        path: 'view/:alias',
        component: ViewComponent
    },
    {
        path: 'create',
        component: EditComponent
    },
    {
        path: 'edit/:alias',
        component: EditComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);