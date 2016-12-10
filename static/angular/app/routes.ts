import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EditComponent } from './user/edit/edit.component';
import { ResultsComponent } from './results/restults.component';
import { ParticipateComponent } from './participate/participate.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pageNetFound.component';

export const appRoutes: Routes = [
   { path: 'user', component: UserComponent },
   { path: 'new', component: EditComponent },
   { path: 'edit/:id', component: EditComponent },
   { path: 'results/:id', component: ResultsComponent },
   { path: 'p/:id', component: ParticipateComponent },
   { path: '', component: HomeComponent },
   { path: '**', component: PageNotFoundComponent },
];
