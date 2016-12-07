import { NgModule }      from '@angular/core';
import { HeaderMenuComponent } from './headerMenu.component';
import { RouterModule } from '@angular/router';

@NgModule({
   imports: [ RouterModule ],
   declarations: [ HeaderMenuComponent ],
   exports:      [ HeaderMenuComponent ]
})
export class HeaderMenuModule { }
