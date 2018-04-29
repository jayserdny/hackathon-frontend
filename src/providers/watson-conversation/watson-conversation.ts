import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as watson from 'watson-developer-cloud/assistant/v1';
import 'rxjs/add/operator/map';

var assistant = new watson({
  username: '8eede8b9-4e2c-4beb-964e-d3ed5723b01b',
  password: 'VGH62iMivBY8',
  url: 'https://gateway.watsonplatform.net/assistant/api',
  version: '2018-02-16',
  headers: {
    'X-Watson-Learning-Opt-Out': 'true',
    'Access-Control-Allow-Headers': '*'
  }
});

/*
  Generated class for the WatsonConversationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WatsonConversationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello WatsonConversationProvider Provider');
    assistant.message(
      {
        input: { text: "What's the weather?" },
        workspace_id: '7d4b13e6-e415-46e4-baed-139ecdb56a86'
      },
      function(err, response) {
        if (err) {
          console.error(err);
        } else {
          console.log(JSON.stringify(response, null, 2));
        }
      }
    );
  }

}
