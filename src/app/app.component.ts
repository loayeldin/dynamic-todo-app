import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit,  AfterViewInit{

  ngAfterViewInit(){
  //   $(document).ready( function() {
  //     alert('Drag and Drop items');
  // });
  }


  ngOnInit() {
  //   $(document).ready( function() {
  //     alert('Drag and Drop items');
  // });
  }


  title = 'todo-app';
}
