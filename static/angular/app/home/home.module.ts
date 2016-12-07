import { NgModule }      from '@angular/core';
import { HomeComponent } from './home.component';
import { EnjoyComponent } from './enjoy/enjoy.component';
import { IntroComponent } from './intro/intro.component';
import { MakeComponent } from './make/make.component';
import { ShareComponent } from './share/share.component';
import { StartComponent } from './start/start.component';
import { TypesComponent } from './types/types.component';
import { HeaderMenuModule } from '../header-menu/headerMenu.module';
import { RouterModule } from '@angular/router';

@NgModule({
   imports: [ RouterModule, HeaderMenuModule ],
   declarations: [
                   HomeComponent,
                   EnjoyComponent,
                   IntroComponent,
                   MakeComponent,
                   ShareComponent,
                   StartComponent,
                   TypesComponent
                 ],
   exports:      [ HomeComponent ]
})
export class HomeModule { }
