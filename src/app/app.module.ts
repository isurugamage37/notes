import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NoteComponent } from './notes-list/note/note.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NotesService } from './notes.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    NoteComponent,
    NoteDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [NotesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
