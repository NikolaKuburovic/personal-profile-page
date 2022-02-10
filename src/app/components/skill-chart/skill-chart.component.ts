import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-skill-chart',
  templateUrl: './skill-chart.component.html',
  styleUrls: ['./skill-chart.component.scss']
})
export class SkillChartComponent implements OnInit {

 
  displayedSkills = [];
  displayedYears = [];

  dataSource = [];
    

public graph = {
    data: [
      { x: ['HTML5', 'CSS3', 'JavaScript', 'Angular', 'ReactJS', 'MySQL', 'C#', 'Java'], y: [5, 4, 2, 1, 1, 2, 2, 2], type: 'bar', marker: { color: '#5eb5ef' } },
    ],
    layout: { width: 800, height: 350, title: 'Skill Chart - Years of Experience'}
  };

  constructor(private api: ApiService) { }

  getAllSkills() {
    this.api.getSkills()
      .subscribe({
        next: (response) => {
          this.displayedSkills = response
          .map((element: { skillName: any; }) => element.skillName);
          this.displayedYears = response
          .map((element: { years: any;}) => element.years);
          
          console.log(this.displayedSkills);
          console.log(this.displayedYears);
        },
        error: (err) => {
          alert("Error while getting skills!");
        }
      })
  }

  ngOnInit(): void {
    this.getAllSkills();
  }

}
