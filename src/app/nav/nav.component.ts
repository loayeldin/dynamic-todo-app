import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormArray } from '@angular/forms';
import {BoardService} from '../mainview/board.service'
import { faCoffee,faTrash,faPenToSquare,faPlus ,faExclamationCircle} from '@fortawesome/free-solid-svg-icons'

declare var $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private boadService:BoardService){}
 
  faPlus=faPlus
  faTrash = faTrash;
  boards:any
  selectedBoard :any
  indexOfSelectedBoard!: number;

  faPenToSquare = faPenToSquare
  faExclamationCircle=faExclamationCircle
  boardForm:FormGroup = new FormGroup(
   { 
    'name': new FormControl(),
    'category': new FormControl(),
    'tasks': new FormArray([])
    
  })
  boardName:FormGroup = new FormGroup({
    'name':new FormControl()
  })
  ngOnInit() {
    this.boards =this.boadService.getBoards()
    this.selectedBoard = this.boards[0]
    this.boadService.boardsChanged.subscribe(boards=>
      {
        this.boards = boards
        this.selectedBoard = this.boards[0]
        console.log('hellloo',  this.boards)
      
      })
  }

  onSubmit()
  { 
    // let tasksDataArr = []
    // const tasksArr = this.boardForm.value.tasks
    // for(let x= 0 ; x <tasksArr.length;x++)
    // {
    //   tasksDataArr.push(tasksArr[x].task)
    //   console.log(tasksDataArr)
    // }
    // const propertyValues = this.boardForm.value.tasks.values(task);

    console.log(this.boardForm)
  this.boadService.addBoard(this.boardForm.value)
  this.boardForm.reset();
  (this.boardForm.get('tasks') as FormArray).clear()

  $('#exampleModal').modal('hide')
     
    
  $('.modal-backdrop').remove()
    
     
  }
  get tasks(): FormArray {


 
    return this.boardForm.get('tasks') as FormArray;
  } // مهمه فشخ في form array

  addTask()
  {
    (<FormArray>this.boardForm.get('tasks')).push(
      new FormGroup({
        'task':new FormControl()
        
      })
    )
      // console.log((<FormArray>this.boardForm.get('tasks')))
  }
  deleteTask(id:number)
  {
    (<FormArray>this.boardForm.get('tasks')).removeAt(id)
  }

  close()
  {
    this.boardForm.reset();
    (this.boardForm.get('tasks') as FormArray).clear()
    
  }



  deleteBoard(id:number)
  {
    console.log(id)
    this.boadService.deleteBoard(id)
  }
  editBoardName(id:number)
  {
    let editedBoardName = this.boadService.getBoardByIndex(id).name
    this.boardName.patchValue({
          name:editedBoardName
        })
  }

  getindex(index:number)
  {
    this.selectedBoard=this.boards[index]
    this.indexOfSelectedBoard = index
    this.boadService.selectedBoardIndex.next(index)
    this.boadService.selectedboard.next(this.boards[index])
    console.log(this.indexOfSelectedBoard, this.boards[index])
  }

  onSubmitEditName()
  {
    console.log(this.boardName.value)
   this.boadService.editBoardName(this.indexOfSelectedBoard,this.boardName.value.name)
   $('#exampleModal3').modal('hide')
     
    
   $('.modal-backdrop').remove()

  }
}
