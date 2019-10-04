import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { IExercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
    selector: 'app-past-trainings',
    templateUrl: './past-trainings.component.html',
    styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

    displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
    dataSource = new MatTableDataSource <IExercise>();

    // gets sortable fields from the html
    @ViewChild(MatSort, {static: false}) sortableFields: MatSort;
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

    constructor(private trService: TrainingService) {}

    ngOnInit() {
        this.dataSource.data = this.trService.getPastExercises();
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sortableFields;
        this.dataSource.paginator = this.paginator;
    }

    doFilter(filterValue: string) {
        // trim().toLocaleLowerCase() because Angular will concatenate all text from all table into a line in lower case
        this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
    }

}
