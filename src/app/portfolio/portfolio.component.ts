
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Typed from 'typed.js';
import { BehaviorSubject } from 'rxjs';
import { EmailComposerService } from '../email-composer.service';
import { EmailService } from '../services/email.service';
// import Waypoint from 'waypoints'
declare const Waypoint: any;


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  currentPos: BehaviorSubject<any|Number> = new BehaviorSubject(0);
  title = 'shashiPortfoilio';
  registerEmail:FormGroup;
  submitted=false;
  form_Status=["INVALID"];
  

  get f() { 
    // console.log(this.registerEmail.controls);
    return this.registerEmail.controls; 
  }
  @HostListener('window:scroll', ['$event']) 
  onScroll(e:Event){
   
    let query= document.querySelector('.back-to-top');
    if(Math.round(e['path'][1].scrollY) > 100){
      query.classList.add('active')
    }else{
      query.classList.remove('active')
    }
  }

  getYPosition(e: Event): number {
    return (e.target as Element).scrollTop;
  }

   select = (el, all = false):any => {
    el = el.trim()
    if (all) {
      return [{...document.querySelectorAll<any>(el)}]
    } else {
      return document.querySelector(el)
    }
  }

  keepTrack(){
    let scrol = this.currentPos.next(window.scrollY);
  }
  skills(){
    let skilsContent =document.querySelector('.skills-content');
    if (skilsContent) {
      new Waypoint({
        element: skilsContent,
        offset: '80%',
        handler: function(direction) {
          let progress = document.querySelectorAll('.progress .progress-bar');
          progress.forEach((el) => {
            el['style'].width = el.getAttribute('aria-valuenow') + '%'
          });
        }
      })
    }
    }

  constructor(private formBuilder: FormBuilder,private email:EmailService) { 
    this.keepTrack();
  }

  ngOnInit(): void {
    const options = {
      strings: ['Freelancer.', 'artist.'],
      typeSpeed: 100,
      backSpeed: 100,
      showCursor: true,
      cursorChar: '|',
      loop: true
 };
 
 const typed = new Typed('.typed', options);
 let backtotop = document.querySelectorAll('.back-to-top');
 
 this.skills();
 this.registerEmail = this.formBuilder.group({
   name:['',[Validators.required]],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    message:['',[Validators.required]]
    });

  }

  MobileNav(){
    document.querySelector('body').classList.toggle('mobile-nav-active')
  }

  submitForm(){
    this.submitted=true;
    if(!this.form_Status.includes(this.registerEmail.status)){
      this.email.sendEmail(JSON.stringify(this.registerEmail.value)).subscribe(val=>{
        alert('Message Sent Sucssefully.')
        this.submitted = false;
        this.registerEmail.reset();
      },err=>{
        alert('Error in Sending Message!!!.');
        this.submitted = false;
        this.registerEmail.reset();
      });
        }
  }

}
