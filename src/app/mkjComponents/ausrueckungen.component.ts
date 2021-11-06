import { Component, OnInit } from '@angular/core';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-ausrueckungen',
  templateUrl: './ausrueckungen.component.html'
})
export class AusrueckungenComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }


  addSingle() {
      this.messageService.clear();
    this.messageService.add({severity:'warn', sticky:true, summary:'Service Message', detail:'Via MessageService'});
}

addMultiple() {
    this.messageService.addAll([{severity:'success', summary:'Service Message', detail:'Via MessageService'},
                    {severity:'info', summary:'Info Message', detail:'Via MessageService'}]);
}

clear() {
    this.messageService.clear();
}
}
