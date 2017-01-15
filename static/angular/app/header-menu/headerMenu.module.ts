import { NgModule }      from '@angular/core';
import { HeaderMenuComponent } from './headerMenu.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {ErrorsComponent} from './errors/errors.component';
import {SuccessesComponent} from "./successes/successes.component";

@NgModule({
   imports: [ RouterModule, CommonModule ],
   declarations: [ HeaderMenuComponent, ErrorsComponent, SuccessesComponent ],
   exports: [ HeaderMenuComponent ]
})
export class HeaderMenuModule {}
