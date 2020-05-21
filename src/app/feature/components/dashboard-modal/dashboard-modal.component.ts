import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { DashboardRESTService } from '@core/services/REST';
import { OpenInvestmentData } from '@core/models';
@Component({
  selector: 'app-dashboard-modal',
  templateUrl: './dashboard-modal.component.html',
  styleUrls: ['./dashboard-modal.component.scss'],
})
export class DashboardModalComponent implements OnInit {
  openDialog: OpenInvestmentData;
  dashForm: FormGroup;
  errorVariable: boolean;
  amountError: boolean;
  showError: string;
  constructor(
    public dialogRef: MatDialogRef<DashboardModalComponent>,
    private dashboardService: DashboardRESTService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.openDialog = {
      fundId: null,
      amount: null,
    };
    this.createForm();
  }
  createForm() {
    this.dashForm = this.formBuilder.group({
      number: [
        '',
        [
          Validators.required,
          // Validators.max(this.data.max),
          // Validators.min(this.data.min),
        ],
      ],
      check: [false, [Validators.requiredTrue]],
    });
  }
  openPost() {
    this.data.needUpdate = true;
    this.openDialog.fundId = this.data.id;
    return this.dashboardService.postOpen(this.openDialog).subscribe(
      (res: any) => {
        this.dialogRef.close({ data: this.data });
        this.snackBar.open(
          'You Have Successfully Confirm The Amount',
          'Success',
          {
            duration: 2000,
          }
        );
      },
      (err) => {
        const errors = err.error;
        if (errors) {
          this.showError = errors.errors.amount;
          this.amountError = true;
        } else {
          this.showError = 'Error';
          this.errorVariable = true;
        }
      }
    );
  }

  ngOnInit() {}
}
