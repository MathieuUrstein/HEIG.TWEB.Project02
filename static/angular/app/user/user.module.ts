import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';

import { UserComponent } from './user.component';
import { ConnectOrRegisterComponent } from './connect-or-register/connectOrRegister.component';
import { ManageComponent } from './manage/manage.component';
import { EditComponent } from './edit/edit.component';
import { AdminTabsComponent } from './admin-tabs/adminTabs.component';

@NgModule({
   imports: [
      SharedModule,
      FormsModule,
   ],
   declarations: [
      UserComponent,
      ConnectOrRegisterComponent,
      ManageComponent,
      EditComponent,
      AdminTabsComponent
   ],
   exports: [
      UserComponent,
      EditComponent
   ]
})
export class UserModule { }
