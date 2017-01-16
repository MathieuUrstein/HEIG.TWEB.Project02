import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Poll, Polls} from '../user/edit/edit.component';
import {ConnectionService} from '../user/connection.service';
import {ErrorsService} from '../header-menu/errors/errors.service';

@Component({
   moduleId: module.id,
   selector: 'results',
   templateUrl: 'results.html',
   styleUrls: ['results.css']
})
export class ResultsComponent  {
   private routeParams: Object;
   private id: string = null;
   private title: string = '';
   private polls: Array<Poll> = [];

   constructor(
      private route: ActivatedRoute,
      private connectionService: ConnectionService,
      private errorsService: ErrorsService
   ) {
      route.params.subscribe(params => {
         this.routeParams = params;
      });
   }

   ngOnInit() {
      if (Object.keys(this.routeParams).length > 0) {
         this.id = this.routeParams['id'];
         this.connectionService.socket.emit('polls-get-results', this.id);
      }

      this.connectionService.socket.on('polls-get-results-' + this.id + '-accepted', (polls: Polls) => {
         console.log('polls-get-results-' + this.id + '-accepted');
         this.title = polls.title;
         this.polls = polls.polls;
      });

      this.connectionService.socket.on('polls-get-results-' + this.id + '-refused', (errors: Array<string>) => {
         console.log('polls-get-results-' + this.id + '-refused');
         this.errorsService.addErrors(errors);
      });
   }

   ngOnDestroy() {
      this.connectionService.socket.off('polls-get-results-' + this.id + '-accepted');
      this.connectionService.socket.off('polls-get-results-' + this.id + '-accepted');
   }
}
