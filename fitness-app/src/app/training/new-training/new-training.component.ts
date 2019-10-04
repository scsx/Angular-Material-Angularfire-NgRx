import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { IExercise } from '../exercise.model';

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

    exercises: IExercise[] = [];

    constructor(private trService: TrainingService) {}

    ngOnInit() {
        this.exercises = this.trService.getAvailableExercises();
    }

    onStartTraining(form: NgForm) {
        this.trService.startExercise(form.value.inputExercise);
    }

}
