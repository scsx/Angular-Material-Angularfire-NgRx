import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TrainingService } from '../training.service';
import { IExercise } from '../exercise.model';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

    exercises: IExercise[];
    exerciseSub$: Subscription;

    constructor(private trService: TrainingService) {}

    ngOnInit() {
        this.exerciseSub$ = this.trService.exercisesChanged$.subscribe(exs => {
            this.exercises = exs;
        });
        this.trService.fetchAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trService.startExercise(form.value.inputExercise);
    }

    ngOnDestroy() {
        this.exerciseSub$.unsubscribe();
    }
}
