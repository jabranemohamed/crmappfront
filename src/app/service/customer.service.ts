import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { CustomHttpResponse, Page, Profile } from '../interface/appstates';
import { User } from '../interface/user';
import { Key } from '../enum/key.enum';

@Injectable({ providedIn: 'root' })
export class CustomerService {
    private readonly server: string = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    customers$ = (page: number = 0) => <Observable<CustomHttpResponse<Page & User>>>
        this.http.get<CustomHttpResponse<Page & User>>
            (`${this.server}/customer/list?page=${page}`)
            .pipe(
                tap(console.log),
                catchError(this.handleError)
            );

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.log(error);
        let errorMessage: string;
        if (error.error instanceof ErrorEvent) {
            errorMessage = `A client error occurred - ${error.error.message}`;
        } else {
            if (error.error.reason) {
                errorMessage = error.error.reason;
                console.log(errorMessage);
            } else {
                errorMessage = `An error occurred - Error status ${error.status}`;
            }
        }
        return throwError(() => errorMessage);
    }
}
