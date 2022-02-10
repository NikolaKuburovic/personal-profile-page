import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postSkill(data: any){
    return this.http.post<any>('http://localhost:3000/skills/', data);
  }

  getSkills(){
    return this.http.get<any>('http://localhost:3000/skills/');
  }

  putSkill(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/skills/'+id, data);
  }

  deleteSkill(id: number){
    return this.http.delete<any>('http://localhost:3000/skills/'+id);
  }
}
