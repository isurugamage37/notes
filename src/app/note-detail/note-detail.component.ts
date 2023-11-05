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
  @Output() showListScreenCall = new EventEmitter();

  monthMap = {
    0: 'January', 1: 'February', 2: 'March',
    3: 'April', 4: 'May', 5: 'June',
    6: 'July', 7: 'August', 8: 'September',
    9: 'October', 10: 'November', 11: 'December'
  }

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
  }


}
