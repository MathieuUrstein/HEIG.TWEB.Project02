import { NgModule } from '@angular/core';
import { HeaderMenuModule } from '../header-menu/headerMenu.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { ConnectOrRegisterComponent } from './connect-or-register/connectOrRegister.component';
import { ManageComponent } from './manage/manage.component';
import { EditComponent } from './edit/edit.component';
import { ParticipateComponent } from './participate/participate.component';
import { AdminTabsComponent } from './admin-tabs/adminTabs.component';
import { ResultsComponent } from './results/restults.component';

@NgModule({
   imports: [ HeaderMenuModule, CommonModule, RouterModule, FormsModule ],
   declarations: [
      UserComponent,
      ConnectOrRegisterComponent,
      ManageComponent,
      EditComponent,
      ParticipateComponent,
      ResultsComponent,
      AdminTabsComponent
   ],
   exports: [
      UserComponent,
      EditComponent,
      ParticipateComponent,
      ResultsComponent
   ]
})
export class UserModule { }
