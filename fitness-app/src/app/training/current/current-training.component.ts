import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training.component';

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

    @Output() trainingExit = new EventEmitter<any>();

    progress = 0;
    timer;

    constructor(private dialog: MatDialog) {}

    ngOnInit() {
        this.startOrResumeTimer();
    }

    startOrResumeTimer() {
        this.timer = setInterval(() => {
            this.progress = this.progress + 5;
            if (this.progress >= 100) {
                clearInterval(this.timer);
            }
        }, 1000);
    }

    stopTimer() {
        // this.progress = 0;
        clearInterval(this.timer);

        // open confirm dialog with the cpt created and object with data to pass as params
        const dialogRef = this.dialog.open(
            StopTrainingComponent,
            {
                data: { progress: this.progress }
            }
        );

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.trainingExit.emit();
            } else {
                this.startOrResumeTimer();
            }
        });

    }

}
