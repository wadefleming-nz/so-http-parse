import { Component, VERSION, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {
  url: string = " https://randomuser.me/api/ "

  constructor(private http: HttpClient) { }

  public getNew(): Observable<any> {
    return this.http.get(this.url)
      .pipe(map(responseData => {
        const returnDataArray = [];
        for (const key in responseData) {
          returnDataArray.push(responseData[key])
        }
        return returnDataArray;
      }))
  }

}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  userData: object;
  fname: string;
  constructor(private randomUser: RandomUserService) { 
    this.randomUser.getNew().subscribe(data => {
      this.userData = data[0][0];
      this.fname = data[0][0].name.first;
    })
  }
  ngOnInit(): void { 
  }
}
