import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatbotProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatbotProvider {

  constructor(public http: HttpClient) {
   
  }

  public responseToBot(response: string, id?: string) {
    return this.http.get(encodeURI('https://stormy-stream-39893.herokuapp.com/api/v1/response?question=' + response.trim() + '&id=' + id)).toPromise();
  }

  public initConversation() {
    return this.http.get(encodeURI('https://stormy-stream-39893.herokuapp.com/api/v1/response?question=')).toPromise();
  }

}
