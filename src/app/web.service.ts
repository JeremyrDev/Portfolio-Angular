import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
     providedIn: 'root'
})
export class WebService {
     readonly ROOT_URL;

     constructor(private http: HttpClient) {
          this.ROOT_URL = 'http://localhost:3002';
          // this.ROOT_URL = 'http://45.77.221.87:3000';
          // this.ROOT_URL = 'https://54.89.8.97:3000';
          // this.ROOT_URL = 'https://www.strmu.xyz';
     }

     get(uri: string) {
          return this.http.get(`${this.ROOT_URL}/${uri}`);
     }

     post(uri: string, payload: Object) {
          return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
     }

     patch(uri: string, payload: Object) {
          return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
     }

     delete(uri: string) {
          return this.http.delete(`${this.ROOT_URL}/${uri}`);
     }
}
