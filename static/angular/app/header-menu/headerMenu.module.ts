import { NgModule }      from '@angular/core';
import { HeaderMenuComponent } from './headerMenu.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
   imports: [ RouterModule, CommonModule ],
   declarations: [ HeaderMenuComponent,  ],
   exports:      [ HeaderMenuComponent ]
})
export class HeaderMenuModule {}
