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
import {CloseModalComponent} from './close-modal/close-modal.component';

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
  years: any;
  months: any;
  days: any;

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
        for (const i of this.funds) {
            this.years = Math.floor(i.duration / 365);
            this.months = Math.floor(i.duration % 365 / 30);
            this.days = Math.floor(i.duration % 365 % 30);
            i.yearsDisplay = this.years > 0 ? this.years + (this.years === 1 ? ' year ' : ' years ') : '';
            i.monthsDisplay = this.months > 0 ? this.months + (this.months === 1 ? ' month ' : ' months ') : '';
            i.daysDisplay = this.days > 0 ? this.days + (this.days === 1 ? ' day' : ' days') : '';
        }
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
  openDialog(fund): void {
    this.open.fundId = fund.id;
    const dialogRef = this.dialog.open(DashboardModalComponent, {
      width: '500px',
      data: {id: this.open.fundId , min: fund.minimumFund , max: fund.maximumFund , name: fund.fundCurrencyShortName}
    });
  }
  closeDialog(closeId): void {
    const dialogRef = this.dialog.open(CloseModalComponent, {
      width: '500px',
      data: {id: closeId}
    });
}
  ngOnInit() {
    this.showFunds();
    this.showRecords();
  }
}

