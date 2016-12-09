import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderMenuModule } from './header-menu/headerMenu.module';
import { HomeModule } from './home/home.module';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pageNetFound.component';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { EditComponent } from './user/edit/edit.component';
import { ParticipateComponent } from './user/participate/participate.component';

import { ConnectionService } from './user/connection.service';


const appRoutes: Routes = [
   { path: 'user', component: UserComponent },
   { path: 'new', component: EditComponent },
   { path: 'edit/:id', component: EditComponent },
   { path: 'p/:id', component: ParticipateComponent },
   { path: '', component: HomeComponent },
   { path: '**', component: PageNotFoundComponent },
];

@NgModule({
   imports: [
      BrowserModule,
      HeaderMenuModule,
      HomeModule,
      UserModule,
      RouterModule.forRoot(appRoutes),
   ],
   declarations: [ AppComponent, PageNotFoundComponent ],
   bootstrap:    [ AppComponent ],
   providers: [ ConnectionService ]
})
export class AppModule { }
