import {Injectable} from '@angular/core';
import {RocketDataModel} from "../../model/rocket.model";
import {BaseService} from "./base.service";
import {catchError, Observable, retry, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RocketService extends BaseService {


  getRockets() {
    const url = `${this.baseUrl}/rockets`;

    return this.http.get<RocketDataModel[]>(url, {
      headers: this.httpHeaders,
    }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  launchRocket(id: string) {
    const url = `${this.baseUrl}/rocket/${id}/status/launched`;

    return this.http.put<any>(url, {}, {
      headers: this.httpHeaders,
    }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  deployRocket(id: string) {
    const url = `${this.baseUrl}/rocket/${id}/status/deployed`;

    return this.http.put<any>(url, {}, {
      headers: this.httpHeaders,
    }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  cancelRocket(id: string) {
    const url = `${this.baseUrl}/rocket/${id}/status/launched`;

    return this.http.delete<any>(url, {
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
    return throwError(() => new Error('Rockets value cannot be fetched from API.'));
  }

}
