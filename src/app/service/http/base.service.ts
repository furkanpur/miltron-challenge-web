import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ToastService} from "../toast.service";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  protected baseUrl: string = 'http://localhost:5000';

  protected httpHeaders: HttpHeaders;

  constructor(protected http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      "X-API-Key": `API_KEY_1`
    });

  }

}
