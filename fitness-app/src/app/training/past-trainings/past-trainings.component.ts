import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { IExercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-past-trainings',
    templateUrl: './past-trainings.component.html',
    styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {

    displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
    dataSource = new MatTableDataSource <IExercise>();
    private exChangedSubs$: Subscription;

    // gets sortable fields from the html
    @ViewChild(MatSort, {static: false}) sortableFields: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    constructor(private trService: TrainingService) {}

    ngOnInit() {
        this.exChangedSubs$ = this.trService.finishedExercisesChanged$.subscribe((exs: IExercise[]) => {
            this.dataSource.data = exs;
        });
        this.trService.fetchPastExercises();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sortableFields;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filterValue: string) {
        // trim().toLocaleLowerCase() because Angular will concatenate all text from all table into a line in lower case
        this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    }

    ngOnDestroy() {
        if (this.exChangedSubs$) {
            this.exChangedSubs$.unsubscribe();
        }
    }

}
