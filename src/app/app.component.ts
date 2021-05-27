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
  currentPos: BehaviorSubject<any|Number> = new BehaviorSubject(0);
  title = 'shashiPortfoilio';
  options = {
    strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
    typeSpeed: 40
  };
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
    console.log(scroll,'scroll');
  }

  constructor(private el: ElementRef){
    this.keepTrack();
    // const typed = this.select('.typed')
    // if (typed) {
    //   let typed_strings = typed.getAttribute('data-typed-items')
    //   typed_strings = typed_strings.split(',');
    //   console.log(typed_strings)
    //   new Typed('.typed', {
    //     strings: typed_strings,
    //     loop: true,
    //     typeSpeed: 100,
    //     backSpeed: 50,
    //     backDelay: 2000
    //   });
    // }
  }
  
  MobileNav(){
    document.querySelector('body').classList.toggle('mobile-nav-active')
     console.log(document.querySelector('body').classList)
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
  
  ngOnInit(){
    const options = {
      strings: ['Freelancer.', 'artist.'],
      typeSpeed: 100,
      backSpeed: 100,
      showCursor: true,
      cursorChar: '|',
      loop: true
 };
 
 const typed = new Typed('.typed', options);
 console.log(window.scrollY)
 let backtotop = document.querySelectorAll('.back-to-top');
 console.log(backtotop);
 this.skills();
//  if (backtotop) {
//    const toggleBacktotop = () => {
//      if (window.scrollY > 100) {
//        backtotop.classList.add('active')
//      } else {
//        backtotop.classList.remove('active')
//      }
//    }
  //  window.addEventListener('load', toggleBacktotop)
  //  onscroll(document, toggleBacktotop)
//  }
  }
  //   new Typed('#typed', {
  //   stringsElement: '#typed-strings'
  // });
  // typed = new Typed('.typed', this.options);
}
