import { Component,Input, OnInit } from '@angular/core';
import { board } from 'src/app/models/board.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BoardService } from '../board.service';
import { faCoffee,faTrash,faPenToSquare,faPlus } from '@fortawesome/free-solid-svg-icons'
declare var $: any;


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit  {
  faTrash = faTrash;
  faPlus=faPlus
  faPenToSquare = faPenToSquare
  @Input() board!:board // مشكله
  @Input() selectedBoardIndex!:number // مشكله 
  editBoard:any
  colIndex:any

  

    constructor(private boardService:BoardService){}
  ngOnInit() {
     this.boardService.selectedBoardIndex.subscribe(data=>{this.selectedBoardIndex=data})
    
      // $('#exampleModal1').modal({
      //   backdrop:false,
      
      // })

      // $('#exampleModal1').on('hidePrevented.bs.modal', function (event: any) {
      //   console.log("hello",event)
      // })

      // $('#exampleModal1').on('hidden.bs.modal', function (event:any) {
      //  console.log("helloooo")
      // })
    
  }
  ngAfterViewInit(){


  }
  addCategory:FormGroup = new FormGroup(
    { 
     'categoryName': new FormControl(),
     'tasks': new FormArray([])
     
   })
   get tasks(): FormArray {


    return this.addCategory.get('tasks') as FormArray;
  } // مهمه فشخ في form array

  addTask()
  {
    (<FormArray>this.addCategory.get('tasks')).push(
      new FormGroup({
        'task':new FormControl()
        
      })
    )
      // console.log((<FormArray>this.addCategory.get('tasks')))
  }
 
  edit(colIndex:number){
   console.log(this.selectedBoardIndex)
    if(this.selectedBoardIndex==undefined)
  {
    this.selectedBoardIndex = 0
  }
  let editBoard = this.boardService.getBoardByIndex(this.selectedBoardIndex).columns[colIndex];
  this.editBoard=editBoard
  this.colIndex =colIndex

  let catName = editBoard.name
 
  for(let task of editBoard.tasks)
  {
  
    (<FormArray>this.addCategory.get('tasks')).push(
      new FormGroup({
        'task':new FormControl(task)
        
      })
    )
    
  }
    // this.addCategory.value.categoryName = catName
    this.addCategory.patchValue({
      categoryName: catName
   });

  // console.log( (<FormControl>this.addCategory.get('categoryName')?.value(catName)))

    }
    onSubmitEdit()
   { 
    // console.log(this.addCategory.value)
    // this.addCategory.reset()
    // console.log(this.addCategory.value)
   
    // this.addCategory.controls['tasks'].patchValue(null)
    
    // this.addCategory.get('address').removeControl('address2');
  
    // this.boardService.editOnBoard(this.selectedBoardIndex,this.colIndex,this.addCategory.value)
    
   
      this.boardService.editOnBoard(this.selectedBoardIndex,this.colIndex,this.addCategory.value);
      (this.addCategory.get('tasks') as FormArray).clear()
      $('#exampleModal2').modal('hide')
     
    
      $('.modal-backdrop').remove()
      this.addCategory.reset();
    (this.addCategory.get('tasks') as FormArray).clear()

   }
  
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

  onSubmit()
  {
    if(this.selectedBoardIndex==undefined)
    {
      this.selectedBoardIndex = 0
    }
    this.boardService.addCat(this.addCategory.value,this.selectedBoardIndex)
    
    this.addCategory.reset();
    (this.addCategory.get('tasks') as FormArray).clear()
    $('#exampleModal1').modal('hide')
     
    
    $('.modal-backdrop').remove()
    this.addCategory.reset();
  (this.addCategory.get('tasks') as FormArray).clear()
   

  }
  close()
  {
    this.addCategory.reset();
    (this.addCategory.get('tasks') as FormArray).clear()
  }

  deleteCat(colIndex:number)
  {
    if(this.selectedBoardIndex==undefined)
    {
      this.selectedBoardIndex = 0
    }
    console.log(this.selectedBoardIndex,this.colIndex)
      this.boardService.deleteCat(this.selectedBoardIndex,colIndex)

  }

  deleteTask(id:number)
  {
    (<FormArray>this.addCategory.get('tasks')).removeAt(id)
  }



//////////////////////////////////////////////////////////////






// editedForm:FormGroup = new FormGroup(
//   { 
  
//    'category': new FormControl(),
//    'tasks': new FormArray([])
   
//  })

// edit(colIndex:number){
//       if(this.selectedBoardIndex==undefined)
//     {
//       this.selectedBoardIndex = 0
//     }
//     let editBoard = this.boardService.getBoardByIndex(this.selectedBoardIndex).columns[colIndex]
//     let list = []
//     this.editedForm = new FormGroup({

//       'category': new FormControl(editBoard.name)
//     })
//     for(let x= 0; x<editBoard.tasks.length; x++)
//     {
//       console.log(editBoard.tasks[x])
//       list.push(editBoard.tasks[x])
//     }
//     console.log(editBoard,list, this.selectedBoardIndex)

// }



 

  //  get taskss(): FormArray {
 
 
  //   console.log(this.editedForm.get('tasks') as FormArray)
  //    return this.editedForm.get('tasks') as FormArray;
  //  } // مهمه فشخ في form array
 
  //  addTaskk()
  //  {
  //    (<FormArray>this.editedForm.get('tasks')).push(
  //      new FormGroup({
  //        'task':new FormControl()
         
  //      })
  //    )
  //      console.log((<FormArray>this.editedForm.get('tasks')))
  //  }


}
