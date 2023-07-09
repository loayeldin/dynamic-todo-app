import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { board } from "../models/board.model";
import { columns } from "../models/columns.model";
@Injectable()
export class BoardService
{
  patchValue(arg0: { name: string; }) {
    throw new Error('Method not implemented.');
  }


    boardsChanged = new Subject<any>();
   
    constructor(){}

    boards:board[] = [

       
      new board('programming',[
        new columns('html',[
          'first html video',
          'second html video'
          
        ]),
        new columns('css',[
          'basics css',
          'advanced css',
          'flexBox'
        ]),
        new columns('js',[
          'basics js',
          'advanced js',
        
        ]),
          new columns('jq',[
          'jquery',
        
        ]),
        new columns('angular',[
          'basics angular',
          'advanced angular',
          'angular projects'
        ]),
        new columns('done',[
         
        ])
    
      ]),

      
      new board('test',[
        new columns('ideas',[
          'first new ideas',
          'second new ideas',
          'third new ideas'
        ]),
        new columns('research',[
          'first new research',
          'second new research',
          'third new research'
        ]),
        new columns('done',[
          'first new done',
          'second new done',
          'third new done'
        ]),
        new columns('inprogress',[
          'first inprogress',
          'second inprogress',
          'thirdinprogress'
        ])
    
      ]),
    
    
   
      
    
    
    ]

    selectedboard = new BehaviorSubject<any>(this.boards[0]);
    selectedBoardIndex = new BehaviorSubject<any>(0)



      getBoards()
      {
        return this.boards
      }
      addBoard(boardData:any)
      {

        console.log(boardData)
        const boardName = boardData.name 
        const boardCategory = boardData.category
        const tasksArr = boardData.tasks
        console.log(boardName,boardCategory,tasksArr)
       
        let tasksDataArr = []
      
        for(let x= 0 ; x <tasksArr.length;x++)
        {
          tasksDataArr.push(tasksArr[x].task)
          console.log(tasksDataArr)
        }


        this.boards.push(
          new board(boardName,[
            new columns(boardCategory,tasksDataArr),
           
        
        
          ]),
          

        )
        console.log( this.boards[0],this.boards[2])
      }

      addCat(catData:any,catIndex:number)
      {
        let catName = catData.categoryName
        const tasksArr = catData.tasks
        let tasksDataArr:any = []
        for(let x= 0 ; x <tasksArr.length;x++)
        {
          tasksDataArr.push(tasksArr[x].task)
          console.log(tasksDataArr)
        }

        console.log(catData,catIndex,tasksDataArr)
        this.boards[catIndex].columns.push(new columns(catName,tasksDataArr))

        console.log(  this.boards[catIndex])
      }
    
      getBoardByIndex(index:number)
      {
        return this.boards[index]
      }

      editOnBoard(boardIndex:any,colIndex:any,editedData:any)
      {  let catName = editedData.categoryName
        let tasksList = editedData.tasks
        let tasksDataArr:any = []
        for(let x= 0 ; x <tasksList.length;x++)
        {
          tasksDataArr.push(tasksList[x].task)
          console.log(tasksDataArr)
        }

      

        console.log(this.boards[boardIndex].columns[colIndex].tasks,tasksDataArr)


         this.boards[boardIndex].columns[colIndex].name = catName
          this.boards[boardIndex].columns[colIndex].tasks = tasksDataArr
      }

      deleteCat(boardIndex:any,colIndex:any)
      {
 
        // delete this.boards[boardIndex].columns[colIndex]
        this.boards[boardIndex].columns.splice(colIndex,1)
   
        this.boardsChanged.next(this.boards)
      }
      deleteBoard(id:number)
      {
        this.boards.splice(id,1)
        this.boardsChanged.next(this.boards)
      }
      editBoardName(id:number,newBoardName:any)
      {
      //  console.log(this.getBoardByIndex(id))
      console.log(newBoardName,this.boards[id].name)
      this.boards[id].name = newBoardName
        this.boardsChanged.next(this.boards)
      }
}