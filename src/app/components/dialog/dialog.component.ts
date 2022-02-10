import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  skillForm !: FormGroup;
  actionButton: string = "Save";
  
  constructor(private formBuilder: FormBuilder, 
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRf: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.skillForm = this.formBuilder.group({
      skillName: ['', Validators.required],
      years: ['', Validators.required]
    })

    if(this.editData){
      this.actionButton = 'Update';
      this.skillForm.controls['skillName'].setValue(this.editData.skillName);
      this.skillForm.controls['years'].setValue(this.editData.years);
    }
  }

  addSkill(){
    if(!this.editData){
      if(this.skillForm.valid){
        this.api.postSkill(this.skillForm.value)
        .subscribe({
          next:(result) => {
            alert("Product is added!!!");
            this.skillForm.reset();
            this.dialogRf.close('added');
          },
          error:()=>{
            alert("Something went wrong! Please try again!");
          }
        })
      }
    }else{
      this.updateSkill();
    }
  }

  updateSkill(){
    this.api.putSkill(this.skillForm.value, this.editData.id)
    .subscribe({
      next:(result)=>{
        alert("Skill updated!");
        this.skillForm.reset();
        this.dialogRf.close('update');
      },
      error:()=>{
         alert("Error while updating the record"); 
      }
    })
  }

}
