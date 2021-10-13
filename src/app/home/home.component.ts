import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  private distroySubscription : Subscription

  constructor() { }

  ngOnInit(): void {
    // this.distroySubscription = interval(1000).subscribe(count =>{
    //   console.log(count);
    // })
    const setCustomObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count>3) {
          observer.error(new Error('Count is greater than 3!!!!'))
        }
        count++;
      }, 1000);
    })

    this.distroySubscription = setCustomObservable.pipe(
      filter((data:number)=>{
        return data > 0;
      })
      ,map((data:number)=>{
        return 'round' + (data + 1);
      })
    )
    .subscribe(data=>{
      console.log(data);
    },error => {
      console.log(error);
      alert(error.message);
    },()=>{
      console.log("completed!!!")
    })
  }

  ngOnDestroy(){
    this.distroySubscription.unsubscribe();
  }

}
