import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {catchError, retry, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {WeatherDataModel} from "../../model/weather.model";

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends BaseService {

  getWeather() {
    const url = `${this.baseUrl}/weather`;

    return this.http.get<WeatherDataModel>(url, {
      headers: this.httpHeaders,
    }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Weather value cannot be fetched from API.'));
  }

}
