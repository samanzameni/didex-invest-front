import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DashboardModalComponent} from './dashboard-modal/dashboard-modal.component';
import {DashboardService} from '../@core/Dashboard/dashboard.service';
import {Funds} from '../@core/Dashboard/funds';
import {Records} from '../@core/Dashboard/records';
import {OpenClose} from '../@core/Dashboard/open-close';
import {FundsType} from '../@core/Dashboard/funds-type.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private dashboardService: DashboardService) {
    this.open = {
      fundId: null,
      amount: null,
    };
    this.close = {
      fundId: null,
    };
  }

  funds: Funds[];
  records: Records[];
  open: OpenClose;
  close: OpenClose;
  panelOpenState = false;
  displayedColumns: string[] = ['timeStamp', 'fundName', 'type', 'brfore', 'after', 'accrued', 'id'];
  dataSource = new MatTableDataSource();
  fundsEnum = FundsType;
  CarouselOptions = {
    responsive: {
      320: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 2
      },
      1200: {
        items: 3, dots: true, nav: true,
      }
    }
  };
  showFunds() {
    return this.dashboardService.getFunds().subscribe(
      (res: any) => {
        console.log(res);
        this.funds = res;
      },
      err => {
        console.log(err);
      },
    );
  }

  showRecords() {
    return this.dashboardService.getRecords().subscribe(
      (res: any) => {
        console.log(res);
        this.records = res;
        this.dataSource.data = this.records;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log(err);
      },
    );
  }

  closePost(fundId) {
    this.close.fundId = fundId;
    return this.dashboardService.postClose(this.close).subscribe(
      (res: any) => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
    );
  }
  openDialog(fund): void {
    this.open.fundId = fund.id;
    const dialogRef = this.dialog.open(DashboardModalComponent, {
      width: '500px',
      data: {id: this.open.fundId}
    });
  }

  ngOnInit() {
    this.showFunds();
    this.showRecords();
  }
}

