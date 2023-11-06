import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'src/app/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: any;
  // currentDate: String;
  
  @Output('noteClicked') noteClicked = new EventEmitter();
  @Output() showDetailsScreenCallEdit = new EventEmitter();
  @Output() showListScreenCall = new EventEmitter();
  showButtons: boolean = false;

  constructor(private notesService: NotesService,
    private router: Router) { }

  ngOnInit() {
    // this.currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');    
  }

  noteClickHandler() {
    // this.note.selected = true;
    this.showButtons = true
    this.noteClicked.emit();
  }

  noteClickHandlerD() {
    // this.note.selected = true;
    this.showButtons = false
  }

  deleteNoteHandler() {
    this.notesService.noteDeleteHandler();
    // this.selectedNote = false;
  }

  editNoteHandler(){
    this.showDetailsScreenCallEdit.emit(true);
  }

}

