import { Component } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'home',
   template: `
               <intro></intro>
               <types></types>
               <make></make>
               <share></share>
               <enjoy></enjoy>
               <start></start>
             `,
   styleUrls: [ 'home.css' ]
})
export class HomeComponent  { }
