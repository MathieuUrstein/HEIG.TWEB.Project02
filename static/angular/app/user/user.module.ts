import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { HeaderMenuModule } from '../header-menu/headerMenu.module';
import { ConnectOrRegisterComponent } from './connect-or-register/connectOrRegister.component';
import { ManageComponent } from './manage/manage.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ParticipateComponent } from './participate/participate.component';
import { AdminTabsComponent } from './admin-tabs/adminTabs.component';

@NgModule({
   imports: [ HeaderMenuModule, CommonModule, RouterModule, FormsModule ],
   declarations: [
      UserComponent,
      ConnectOrRegisterComponent,
      ManageComponent,
      EditComponent,
      ParticipateComponent,
      AdminTabsComponent
   ],
   exports: [
      UserComponent,
      EditComponent,
      ParticipateComponent
   ]
})
export class UserModule { }
