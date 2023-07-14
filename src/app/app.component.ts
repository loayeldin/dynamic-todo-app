import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faBars} from '@fortawesome/free-solid-svg-icons'

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit,  AfterViewInit{
  isSidebarHidden = true;
  faBars=faBars
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
 
  
  }
  ngAfterViewInit(){
 
  }


  ngOnInit() {
  
  }


  title = 'todo-app';
}
