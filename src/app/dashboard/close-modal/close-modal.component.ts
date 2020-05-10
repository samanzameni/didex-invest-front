import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DashboardRESTService } from '../../core/services/REST';
import { CloseInvestmentData } from '../../core/models';

@Component({
  selector: 'app-close-modal',
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.scss'],
})
export class CloseModalComponent implements OnInit {
  closeDialog: CloseInvestmentData;
  errorVariable: boolean;
  amountError: boolean;
  showError: string;
  constructor(
    public dialogRef: MatDialogRef<CloseModalComponent>,
    private dashboardService: DashboardRESTService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.closeDialog = {
      fundId: null,
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closePost() {
    this.data.needUpdate = true;
    this.closeDialog.fundId = this.data.id;
    return this.dashboardService.postClose(this.closeDialog).subscribe(
      (res: any) => {
        this.snackBar.open(
          'You Have Successfully Confirm The Amount',
          'Success',
          {
            duration: 2000,
          }
        );
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
  }
}
