import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TermsService {

    constructor(private http: HttpClient) {}

    public getTerms(): Observable<any> {
        return this.http.get('https://baconipsum.com/api/?type=meat-and-filler');
    }

}
