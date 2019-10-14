import { IExercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UIService } from '../shared/ui.service';

@Injectable({
    providedIn: 'root'
})
export class TrainingService {

    exerciseChanged$ = new Subject<IExercise>();
    exercisesChanged$ = new Subject<IExercise[]>();
    finishedExercisesChanged$ = new Subject<IExercise[]>();
    // comes from firebase now:
    /* private availableExercises: IExercise[] = [
        { id: 'sprint', name: 'Sprint', duration: 15, calories: 300 },
        { id: 'biceps', name: 'Biceps', duration: 30, calories: 80 },
        { id: 'push-ups', name: 'Push-ups', duration: 40, calories: 180 },
        { id: 'abs', name: 'Abs', duration: 60, calories: 80 }
    ]; */
    private availableExercises: IExercise[] = [];
    private runningExercise: IExercise;
    private fbSubs$: Subscription[] = [];

    constructor(private db: AngularFirestore, private uiService: UIService) {}

    // this subscription replaces itself;
    // if we navigate back and forth the component calls this again but doesnt "pile up" subscriptions
    fetchAvailableExercises() {
        this.uiService.loadingStateChanged.next(true);
        this.fbSubs$.push(
            this.db.collection('availableExercises').snapshotChanges().pipe(
                map( docArray => {
                    // test this.uiService.showSnackbar(error)
                    // throw(new Error());
                    return docArray.map(doc => {
                        return {
                            id: doc.payload.doc.id,
                            // tslint:disable-next-line: no-string-literal
                            name: doc.payload.doc.data()['name'],
                            // tslint:disable-next-line: no-string-literal
                            duration: doc.payload.doc.data()['duration'],
                            // tslint:disable-next-line: no-string-literal
                            calories: doc.payload.doc.data()['calories']
                        };
                    });
                })
            ).subscribe((exercises: IExercise[]) => {
                this.uiService.loadingStateChanged.next(false);
                this.availableExercises = exercises;
                this.exercisesChanged$.next([...this.availableExercises]);
            }, error => {
                this.uiService.loadingStateChanged.next(false);
                this.uiService.showSnackbar('Fetching exercises failed, try later!', null, 10000);
                this.exercisesChanged$.next(null);
            }));
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise, // IExercise
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged$.next(null);
    }

    cancelExercise(progress) {
        this.addDataToDatabase({
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

    fetchPastExercises() {
        this.fbSubs$.push(
            this.db.collection('finishedExercises').valueChanges().subscribe((exs: IExercise[]) => {
                this.finishedExercisesChanged$.next(exs);
            })
        );
    }

    cancelSubscriptions() {
        this.fbSubs$.forEach(sub => sub.unsubscribe());
    }

    private addDataToDatabase(exercise: IExercise) {
        // 1st time this collections doesnt exist; if thats the case Firebase creates it
        this.db.collection('finishedExercises').add(exercise);
    }

}
