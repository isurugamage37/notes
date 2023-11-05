import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  public notesList!: any[];

  public filteredNotes!: any[];

  selectedNote = null;
  disableEditing = false;

  searchedText = '';
  @Output() showDetailsScreenCall = new EventEmitter();

  constructor(private notesService: NotesService) {
    // notesService.clearData();
    this.notesService.clearData();
    // this.setDummyNote();
   }

  ngOnInit() {
     this.notesService.clearData();
    this.notesList = JSON.parse(localStorage.getItem('notes')  || '{}');
    this.filteredNotes = this.notesList;
    this.notesService.noteSearchSubscription.subscribe(({value} : any) => {
      this.filteredNotes = this.searchedNotes(value);
    });
    this.notesService.noteDetailSubscription.subscribe((data: any) => {
      if ( data.note ) {
        const noteIndex = this.notesList.findIndex(note => note.id === data.note.id);
        this.notesList[noteIndex].body = data.value.body;
        this.notesList[noteIndex].title = data.value.title;
      } else {
        this.notesList[0].body = data.value.body;
        this.notesList[0].title = data.value.title;
      }
      localStorage.setItem('notes', JSON.stringify(this.notesList));
    });

    this.notesService.noteSubscription.subscribe((data: any) => {
      if ( data.action === 'delete' && this.selectedNote ) {
          this.notesList.splice(this.getSelectedNoteIndex(), 1);
          if(this.notesList.length === 0){
            // this.setDummyNote();
          }
      }
      if ( data.action === 'addEdit' ) {
        let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');    
        
        this.notesList.forEach(note => note.selected = false);
        // this.notesList.push({
        //   id: Math.random() * 100,
        //   body: '',
        //   title: '',
        //   date: currentDate,
        //   selected: true
        // });
        this.noteClickHandler(this.notesList[this.notesList,length-1]);
      }
      localStorage.setItem('notes', JSON.stringify(this.notesList));
    });
  }

  setDummyNote() {
    let notes = JSON.parse(localStorage.getItem('notes')  || '{}');
    if( !notes || notes && notes.length === 0 ){
      let currentDate = (new Date().getHours() > 12? new Date().getHours() - 12: new Date().getHours()) + ':'  + new Date().getMinutes() + (new Date().getHours() > 12? ' PM': ' AM');      
      const newNote = {
        id: Math.random() * 100,
        body: '',
        title: '',
        date: currentDate,
        selected: true
      };
      localStorage.setItem('notes', JSON.stringify([newNote])); 
      this.notesList = JSON.parse(localStorage.getItem('notes')  || '{}');
      this.notesService.noteClickSubscription.next(newNote);
    }
  }

  addNoteHandler(){
    // this.setDummyNote();
    this.showDetailsScreenCall.emit(true);
    this.notesService.noteAddEditHandler();
  }

  editNoteHandler(){
    this.setDummyNote();
    this.showDetailsScreenCall.emit(true);
    // this.notesService.noteAddEditHandler();
  }

  getSelectedNoteIndex() {
    const index = this.notesList.findIndex( note => note.selected  === true );
    this.selectedNote = this.notesList[index];
    return index;
  }

  removeSelection() {
    this.notesList.forEach(note => note.selected = false);
  }

  deleteNoteHandler() {
    this.notesService.noteDeleteHandler();
    // this.selectedNote = false;
  }

  noteClickHandler(data: any) {
    const index = this.notesList.findIndex( note => note.id === data.id );
    this.selectedNote = this.notesList[index];
    this.notesList.forEach(note => note.selected = false);
    this.notesList[index].selected = true;
    this.notesService.noteClickSubscription.next(this.notesList[index]);
  }

  searchedNotes(value? : any){
    if( value || (typeof value === 'string' && value.length === 0) ){
       this.searchedText = value; 
    }
    if( this.notesList && this.notesList.length > 0 ){
      return this.notesList.filter((note) => {
        if( this.searchedText.trim().length === 0 || 
          note.title.indexOf(this.searchedText.trim()) > -1 || 
          note.body.indexOf(this.searchedText.trim()) > -1 ){
          return true;
        } else {
          return false;
        }
    });
    } else {
      return [];
    }
    
  }

  searchHandler(inputEl: { value: any; }) {
    this.notesService.searchHandler(inputEl.value);
  }

}

