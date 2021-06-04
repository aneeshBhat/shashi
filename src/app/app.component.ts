import { Component, HostListener, ElementRef } from '@angular/core';
import Typed from 'typed.js';
import { BehaviorSubject } from 'rxjs';
// import Waypoint from 'waypoints'
declare const Waypoint: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private el: ElementRef){
  }
  
   ngOnInit(){
  
    }
  
}
