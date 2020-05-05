import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DashboardService } from '../../@core/Dashboard/dashboard.service';
import { OpenClose } from '../../@core/Dashboard/open-close';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-close-modal',
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.scss'],
})
export class CloseModalComponent implements OnInit {
  openDialog: OpenClose;
  errorVariable: boolean;
  amountError: boolean;
  showError: string;
  constructor(
    public dialogRef: MatDialogRef<CloseModalComponent>,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.openDialog = {
      fundId: null,
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closePost() {
    this.openDialog.fundId = this.data.id;
    return this.dashboardService.postClose(this.openDialog).subscribe(
      (res: any) => {
        this.snackBar.open(
          'You Have Successfully Confirm The Amount',
          'Success',
          {
            duration: 2000,
          }
        );
        this.dialogRef.close();
      },
      (err) => {
        const errors = err.error.errors;
        if (errors) {
          this.showError = errors.fundId;
          this.amountError = true;
        } else {
          this.showError = 'Error';
          this.errorVariable = true;
        }
      }
    );
  }
  ngOnInit() {
    console.log(this.data);
  }
}
