import { NgModule }      from '@angular/core';
import { HeaderMenuModule } from './header-menu/headerMenu.module';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { RouterModule } from '@angular/router';

import { HeaderMenuComponent } from './header-menu/headerMenu.component';
import { FooterComponent } from './footer/footer.component';

import { appRoutes } from './routes';

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
   ]
})
export class SharedModule { }
