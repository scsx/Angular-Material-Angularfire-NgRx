import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-training',
    templateUrl: './training.component.html',
    styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {

    ongoingTraining = false;
    exerciseSubscription$: Subscription;

    constructor(private trService: TrainingService) {}

    ngOnInit() {
        this.exerciseSubscription$ = this.trService.exerciseChanged$.subscribe(ex => {
            if (ex) {
                this.ongoingTraining = true;
            } else {
                this.ongoingTraining = false;
            }
        });
    }

    ngOnDestroy() {
        if (this.exerciseSubscription$) {
            this.exerciseSubscription$.unsubscribe();
        }
    }

}
