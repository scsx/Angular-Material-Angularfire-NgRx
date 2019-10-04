import { IExercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    exerciseChanged$ = new Subject<IExercise>();
    private availableExercises: IExercise[] = [
        { id: 'sprint', name: 'Sprint', duration: 15, calories: 300 },
        { id: 'biceps', name: 'Biceps', duration: 30, calories: 80 },
        { id: 'push-ups', name: 'Push-ups', duration: 40, calories: 180 },
        { id: 'abs', name: 'Abs', duration: 60, calories: 80 }
    ];
    private runningExercise: IExercise;
    private exercises: IExercise[] = [];

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    completeExercise() {
        this.exercises.push({
            ...this.runningExercise, // IExercise
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged$.next(null);
    }

    cancelExercise(progress) {
        this.exercises.push({
            ...this.runningExercise, // IExercise
            calories: this.runningExercise.calories * (progress / 100),
            duration: this.runningExercise.duration * (progress / 100),
            date: new Date(),
            state: 'cancelled',
        });
        this.runningExercise = null;
        this.exerciseChanged$.next(null);
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId );
        this.exerciseChanged$.next({...this.runningExercise});
    }

    getRunningExercise() {
        return {...this.runningExercise};
    }

    getPastExercises() {
        return this.exercises.slice();
    }

}
