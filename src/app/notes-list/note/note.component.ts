import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: any;
  // currentDate: String;
  
  @Output('noteClicked') noteClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // this.currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');    
  }

  noteClickHandler() {
    // this.note.selected = true;
    this.noteClicked.emit();
  }

}

