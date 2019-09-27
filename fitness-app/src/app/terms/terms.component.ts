import { Component, OnInit, OnDestroy } from '@angular/core';
import { TermsService } from './terms.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-terms',
    templateUrl: './terms.component.html',
    styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit, OnDestroy {

    termsText: Array <string> = [];
    termsSub$: Subscription;

    constructor(private termsService: TermsService) {}

    ngOnInit() {
        this.getTheTerms();
    }

    getTheTerms() {
        this.termsSub$ = this.termsService.getTerms().subscribe(
            data => {
                this.termsText = data;
            },
            error => {
                console.log("Error getting terms: " +  error);
            }
        );
    }

    ngOnDestroy() {
        this.termsSub$.unsubscribe();
    }

}
