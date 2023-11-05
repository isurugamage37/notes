import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hideSideNav = false;
  title = 'Note App';
  public showListScreen : boolean| undefined;
  public showDetailsScreen : boolean| undefined;

  constructor( private notesService: NotesService ){
    this.showListScreen = true;
    this.showDetailsScreen = false;
  }
  ngOnInit() {
    this.notesService.showHideSubscription.subscribe(() => {
      this.hideSideNav = !this.hideSideNav;
    });
  }

  showDetailsScreenCall(event:any):void{
    this.showListScreen = false;
    this.showDetailsScreen = true;
  }
  showListScreenCall(event:any):void{
    this.showListScreen = true;
    this.showDetailsScreen = false;
  }
  
  
}

