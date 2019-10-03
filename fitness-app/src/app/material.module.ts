import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatCardModule, MatSidenavModule,
MatToolbarModule, MatListModule, MatTabsModule, MatSelectModule, MatProgressSpinnerModule,
MatDialogModule  } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ]
})

export class MaterialModule {}
