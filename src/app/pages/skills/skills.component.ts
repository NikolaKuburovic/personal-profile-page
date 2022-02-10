import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  displayedColumns: string[] = ['skillName', 'years', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private dialog: MatDialog, private api: ApiService) { }

  
  getAllSkills() {
    this.api.getSkills()
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response); 
        },
        error: (err) => {
          alert("Error while getting skills!");
        }
      })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '35%'
    }).afterClosed().subscribe(val=>{
      if(val==='save'){
        this.getAllSkills();
        console.log("This open dialog works!!!!");
      }
    })
  }

  editSkill(element: any){
    this.dialog.open(DialogComponent, {
      width:'35%',
      data: element
    }).afterClosed().subscribe(val =>{
      if(val==='update'){
        this.getAllSkills();
      }
    })
  }

  deleteSkill(id: number){
    this.api.deleteSkill(id).subscribe({
      next:(result)=>{
        alert("Skill is deleted!");
        this.getAllSkills();
      },
      error:()=>{
        alert("Error while deleting the skill!");
      }
    })
  }

  ngOnInit(): void {
    this.getAllSkills();
  }

}
