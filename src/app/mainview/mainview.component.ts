import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { board } from '../models/board.model';
import { columns } from '../models/columns.model';
import { BoardService } from './board.service';
import { faCoffee,faTrash,faPenToSquare,faPlus,faGear } from '@fortawesome/free-solid-svg-icons'
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';

declare var $: any;


@Component({
  selector: 'app-mainview',
  templateUrl: './mainview.component.html',
  styleUrls: ['./mainview.component.scss']
})
export class MainviewComponent implements OnInit{

  constructor(public boardservice:BoardService){}
  faTrash = faTrash;
  faGear=faGear;
  faPlus=faPlus
  faPenToSquare = faPenToSquare
 boards:any
 selectedBoard :any
 indexOfSelectedBoard!: number;
 boardForm:FormGroup = new FormGroup(
  { 
   'name': new FormControl(),
   'category': new FormControl(),
   'tasks': new FormArray([])
   
 })
  ngOnInit(){
    this.boards =this.boardservice.getBoards()
    this.selectedBoard = this.boards[0]
    this.boardservice.boardsChanged.subscribe(boards=>
      {
        this.boards = boards
        this.selectedBoard = this.boards[0]
        console.log('hellloo',  this.boards)
      
      })
      this.boardservice.selectedboard.subscribe(data=>{this.selectedBoard=data})


      

  }
 
  

  boardName:FormGroup = new FormGroup({
    'name':new FormControl()
  })
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // getindex(index:number)
  // {
  //   this.selectedBoard=this.boards[index]
 
  //   this.indexOfSelectedBoard = index
  //   console.log(this.indexOfSelectedBoard, this.boards[index])
  // }

  // deleteBoard(id:number)
  // {
  //   console.log(id)
  //   this.boardservice.deleteBoard(id)
  // }
  // editBoardName(id:number)
  // {
  //   let editedBoardName = this.boardservice.getBoardByIndex(id).name
  //   this.boardName.patchValue({
  //     name:editedBoardName
  //   })
  // }
  // onSubmit()
  // {
  //   console.log(this.boardName.value)
  //  this.boardservice.editBoardName(this.indexOfSelectedBoard,this.boardName.value.name)
  // }
}
