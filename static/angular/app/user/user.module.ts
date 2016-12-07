import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { HeaderMenuModule } from '../header-menu/headerMenu.module';
import { ConnectionComponent } from './connection/connection.component';
import { ManageComponent } from './manage/manage.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
   imports: [ HeaderMenuModule, CommonModule, RouterModule ],
   declarations: [ UserComponent, ConnectionComponent, ManageComponent ],
   exports: [ UserComponent ]
})
export class UserModule { }
