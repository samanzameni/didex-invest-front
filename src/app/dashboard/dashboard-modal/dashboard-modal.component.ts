import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DashboardService} from '../../@core/Dashboard/dashboard.service';
import {OpenClose} from '../../@core/Dashboard/open-close';
@Component({
  selector: 'app-dashboard-modal',
  templateUrl: './dashboard-modal.component.html',
  styleUrls: ['./dashboard-modal.component.scss']
})
export class DashboardModalComponent implements OnInit {
  openDialog: OpenClose;
  constructor(
    public dialogRef: MatDialogRef<DashboardModalComponent>, private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.openDialog = {
      fundId : null,
      amount: null,
    };
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
