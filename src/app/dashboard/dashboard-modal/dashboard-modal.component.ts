import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DashboardService} from '../../@core/Dashboard/dashboard.service';
import {OpenClose} from '../../@core/Dashboard/open-close';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-dashboard-modal',
  templateUrl: './dashboard-modal.component.html',
  styleUrls: ['./dashboard-modal.component.scss']
})
export class DashboardModalComponent implements OnInit {
  openDialog: OpenClose;
  dashForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DashboardModalComponent>, private dashboardService: DashboardService, private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.openDialog = {
      fundId : null,
      amount: null,
    };
    this.createForm();
  }
  createForm() {
    this.dashForm = this.formBuilder.group({
      number: ['', [Validators.required , Validators.max(this.data.max) , Validators.min(this.data.min)]],
      check: [false, [Validators.requiredTrue]],
    });
  }
  openPost() {
    this.openDialog.fundId = this.data.id;
    console.log(this.openDialog);
    return this.dashboardService.postOpen(this.openDialog).subscribe(
      (res: any) => {
        console.log(res);
        this.dialogRef.close();
      },
      err => {
        console.log(err);
      },
    );
  }

  ngOnInit() {
console.log(this.data);
  }
}
