import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';


export interface AboutMe {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  folders: AboutMe[] = [
    {
      question: 'Profession',
      answer: 'Front-End Developer',
    },
    {
      question: 'Education',
      answer: 'Faculty of Information Technology, Metropolitan University, Belgrade',
    },
    {
      question: 'Portfolio',
      answer: 'https://github.com/NikolaKuburovic',
    },
    {
      question: 'Linkedin',
      answer: 'https://www.linkedin.com/in/nikola-kuburovic/',
    },
    {
      question: 'Graphic Design Portfolio',
      answer: 'https://www.behance.net/nikolakuburovic',
    },
  ];

  displayedColumns: string[] = ['skillName'];
  dataSource!: MatTableDataSource<any>;

  constructor(private api: ApiService) { }

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

  ngOnInit(): void {
    this.getAllSkills();
  }

}
