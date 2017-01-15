import { NgModule }      from '@angular/core';
import { HeaderMenuModule } from './header-menu/headerMenu.module';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { RouterModule } from '@angular/router';

import { HeaderMenuComponent } from './header-menu/headerMenu.component';
import { FooterComponent } from './footer/footer.component';

import { appRoutes } from './routes';
import {AuthGuard} from "./user/auth.guard";
import {ConnectionService} from "./user/connection.service";
import {ErrorsService} from "./header-menu/errors/errors.service";
import {SuccessesService} from "./header-menu/successes/successes.service";

@NgModule({
   imports: [
      HeaderMenuModule,
      FooterModule,
      CommonModule,
      RouterModule.forRoot(appRoutes)
   ],
   exports: [
      CommonModule,
      RouterModule,
      HeaderMenuComponent,
      FooterComponent
   ],
   providers: [
      AuthGuard,
      ConnectionService,
      ErrorsService,
      SuccessesService
   ]
})
export class SharedModule { }
