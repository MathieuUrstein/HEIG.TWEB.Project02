import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HeaderMenuModule } from './header-menu/headerMenu.module';
import { HomeModule } from './home/home.module';

@NgModule({
   imports:      [ BrowserModule, HeaderMenuModule, HomeModule ],
   declarations: [ AppComponent ],
   bootstrap:    [ AppComponent ]
})
export class AppModule { }
