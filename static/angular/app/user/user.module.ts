import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { ConnectOrRegisterComponent } from './connect-or-register/connectOrRegister.component';
import { ManageComponent } from './manage/manage.component';
import { EditComponent } from './edit/edit.component';
import { AdminTabsComponent } from './admin-tabs/adminTabs.component';
import { ClickOutsideDirective } from './edit/clickOutside.directive';

@NgModule({
   imports: [
      SharedModule,
      FormsModule,
   ],
   declarations: [
      ConnectOrRegisterComponent,
      ManageComponent,
      EditComponent,
      AdminTabsComponent,
      ClickOutsideDirective
   ],
   exports: [
      EditComponent
   ]
})
export class UserModule { }
