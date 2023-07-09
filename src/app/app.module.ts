import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainviewComponent } from './mainview/mainview.component';
import { NavComponent } from './nav/nav.component';
import{DragDropModule} from '@angular/cdk/drag-drop';
import { BoardsComponent } from './mainview/boards/boards.component'
import { BoardService } from './mainview/board.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




@NgModule({
  declarations: [
    AppComponent,
    MainviewComponent,
    NavComponent,
    BoardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
