import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Settings } from './pages/settings/settings';
import { Avatar } from './pages/avatar/avatar';
import { Login } from './pages/login/login';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: Login,
    },
    {
        path: 'settings',
        component: Settings,
        canActivate: [AuthGuard],
    },
    {
        path: 'avatar',
        component: Avatar,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
