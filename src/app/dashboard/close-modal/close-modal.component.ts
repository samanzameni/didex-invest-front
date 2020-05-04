import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DashboardService} from '../../@core/Dashboard/dashboard.service';
import {OpenClose} from '../../@core/Dashboard/open-close';

@Component({
  selector: 'app-close-modal',
  templateUrl: './close-modal.component.html',
  styleUrls: ['./close-modal.component.scss']
})
export class CloseModalComponent implements OnInit {
  openDialog: OpenClose;
  constructor(
    public dialogRef: MatDialogRef<CloseModalComponent>, private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.openDialog = {
      fundId : null,
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  closePost() {
    this.openDialog.fundId = this.data.id;
    return this.dashboardService.postClose(this.openDialog).subscribe(
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
