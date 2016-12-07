import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderMenuModule } from './header-menu/headerMenu.module';
import { HomeModule } from './home/home.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './pageNetFound.component';
import { UserComponent } from './user/user.component';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
   { path: 'user', component: UserComponent },
   { path: '', component: HomeComponent },
   { path: '**', component: PageNotFoundComponent }
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
   bootstrap:    [ AppComponent ]
})
export class AppModule { }
