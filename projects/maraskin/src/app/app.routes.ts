import { Routes } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';
import { SnackComponent } from './pages/snack/snack.component';
import { Home } from './pages/home/home';
import { SettingsComponent } from './pages/settings/settings.component';
import { Avatar } from './pages/avatar/avatar';
import { OfflineGuard } from 'cerebellum';
import { OfflineComponent } from './pages/offline/offline.component';

export const routes: Routes = [
    { path: 'home', component: Home, canActivate: [OfflineGuard] },
    { path: 'snack', component: SnackComponent, canActivate: [OfflineGuard] },
    { path: 'menu', component: MenuComponent, canActivate: [OfflineGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [OfflineGuard] },
    { path: 'avatar', component: Avatar, canActivate: [OfflineGuard] },
    { path: 'offline', component: OfflineComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
