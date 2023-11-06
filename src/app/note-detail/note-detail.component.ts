import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  note: any = null;
  currentDate: string = "";
  isButtonDisabled: boolean = true;
  @Output() showListScreenCall = new EventEmitter();
  @ViewChild('titleTextarea', { static: true })
  titleTextarea!: ElementRef;
  @ViewChild('bodyTextarea', { static: true })
  bodyTextarea!: ElementRef;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.currentDate = (new Date().getDate() + ', ' + new Date().getFullYear()) + ' at ' + (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()) + ':' + ("0" + new Date().getMinutes()).slice(-2) + (new Date().getHours() > 12 ? ' PM' : ' AM');
    setInterval(() => {
      this.currentDate = (new Date().getDate() + ', ' + new Date().getFullYear()) + ' at ' + (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()) + ':' + ("0" + new Date().getMinutes()).slice(-2) + (new Date().getHours() > 12 ? ' PM' : ' AM');
    }, 1000);
    this.notesService.noteClickSubscription.subscribe((note) => {
      this.note = note;
      this.bodyTextarea.nativeElement.value = this.note.body;
      this.titleTextarea.nativeElement.value = this.note.title;
      this.titleTextarea.nativeElement.focus();
    });

    this.notesService.noteSubscription.subscribe((data: any) => {
      this.bodyTextarea.nativeElement.value = '';
      this.titleTextarea.nativeElement.value = '';
      this.note = null;
    });

    this.notesService.disableEditingSubscription.subscribe(({ disableEditing }: any) => {
      this.bodyTextarea.nativeElement.disabled = disableEditing;
      this.titleTextarea.nativeElement.disabled = disableEditing;

    });
  }

  textInputHandler() {
    this.notesService.noteDetailSubscription.next({ value: { body: this.bodyTextarea.nativeElement.value, title: this.titleTextarea.nativeElement.value }, note: this.note });
  }

  saveNote() {
    this.showListScreenCall.emit(true);
    this.isButtonDisabled = true;
  }

  back() {
    this.showListScreenCall.emit(true);
    if (this.titleTextarea.nativeElement.value.trim().length > 0 || this.bodyTextarea.nativeElement.value.trim().length > 0 ) {
    } else {
      this.notesService.noteDeleteHandler();
    }
   
  }
  onInputChange() {
    if (this.titleTextarea.nativeElement.value.trim().length > 0 || this.bodyTextarea.nativeElement.value.trim().length > 0 ) {
      this.isButtonDisabled = false; 
    } else {
      this.isButtonDisabled = true;
    }
  }

}
