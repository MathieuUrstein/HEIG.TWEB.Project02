import {Routes} from '@angular/router';
import { EditComponent } from './user/edit/edit.component';
import { ResultsComponent } from './results/restults.component';
import { ParticipateComponent } from './participate/participate.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pageNetFound.component';
import { AuthGuard } from './user/auth.guard';
import { ManageComponent } from './user/manage/manage.component';
import { ConnectOrRegisterComponent } from './user/connect-or-register/connectOrRegister.component';

export const appRoutes: Routes = [
   { path: 'manage', component: ManageComponent, canActivate: [AuthGuard] },
   { path: 'new', component: EditComponent, canActivate: [AuthGuard] },
   { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
   { path: 'r/:id', component: ResultsComponent, canActivate: [AuthGuard] },
   { path: 'p/:id', component: ParticipateComponent },
   { path: 'connect', component: ConnectOrRegisterComponent },
   { path: '', component: HomeComponent },
   { path: '**', component: PageNotFoundComponent },
];
