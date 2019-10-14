import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { UIService } from 'src/app/shared/ui.service';
import { IExercise } from '../exercise.model';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

    exercises: IExercise[];
    private exerciseSub$: Subscription;
    // loading spinner show/hide
    isLoading = false;
    private isLoadingSub$: Subscription;

    constructor(private trService: TrainingService, private uiService: UIService) {}

    ngOnInit() {
        // spinner
        this.isLoadingSub$ = this.uiService.loadingStateChanged.subscribe(isLoading => {
            this.isLoading = isLoading;
        });
        // get exercises
        this.exerciseSub$ = this.trService.exercisesChanged$.subscribe(exs => {
            this.exercises = exs;
        });
        this.fetchExercises();
    }

    fetchExercises() {
        this.trService.fetchAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trService.startExercise(form.value.inputExercise);
    }

    ngOnDestroy() {
        if (this.exerciseSub$) {
            this.exerciseSub$.unsubscribe();
        }
        if (this.isLoadingSub$) {
            this.isLoadingSub$.unsubscribe();
        }
    }
}
