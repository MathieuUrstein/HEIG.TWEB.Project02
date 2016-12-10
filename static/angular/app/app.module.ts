import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

import { PageNotFoundComponent } from './pageNetFound.component';
import { AppComponent } from './app.component';
import { ParticipateComponent } from './participate/participate.component';
import { ResultsComponent } from './results/restults.component';

import { ConnectionService } from './user/connection.service';
import { SharedModule } from './shared.module';


@NgModule({
   imports: [
      SharedModule,
      BrowserModule,
      HomeModule,
      UserModule
   ],
   declarations: [
      AppComponent,
      PageNotFoundComponent,
      ResultsComponent,
      ParticipateComponent
   ],
   bootstrap:    [ AppComponent ],
   providers: [ ConnectionService ]
})
export class AppModule { }
