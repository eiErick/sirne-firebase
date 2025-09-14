import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Settings } from './pages/settings/settings';
import { Avatar } from './pages/avatar/avatar';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'settings', component: Settings },
    { path: 'avatar', component: Avatar },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
