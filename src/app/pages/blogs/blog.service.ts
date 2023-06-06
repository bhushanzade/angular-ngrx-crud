import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  $subject: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    private http: HttpClient
  ) { }

  callService(): Observable<any> {
    const url = environment.base_url + '/blogs';
    return this.http.get(url);
  }
}