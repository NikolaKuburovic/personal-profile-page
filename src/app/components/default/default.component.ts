import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BreakpointObserver} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements AfterViewInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) { }

  ngAfterViewInit(): void {

    setTimeout(()=>{
      this.observer.observe(['(max-width: 768px)']).subscribe((result)=>{
        if(result.matches){
          this.sidenav.mode = 'over';
          this.sidenav.close();
        }
        else{
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      })
    }, 0);
    
  }

}
