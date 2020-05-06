import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DashboardModalComponent } from './dashboard-modal/dashboard-modal.component';
import { Funds } from '../@core/Dashboard/funds';
import { Records } from '../@core/Dashboard/records';
import { OpenClose } from '../@core/Dashboard/open-close';
import { FundsType } from '../@core/Dashboard/funds-type.enum';
import { CloseModalComponent } from './close-modal/close-modal.component';
import { InvestRecordType } from '../@core/Dashboard/ invest-record-type.enum';
import { CONSTANTS } from '@core/util/constants';
import { DashboardRESTService } from '@core/services/REST';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ids: number[];

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardRESTService,
    private authService: AuthService
  ) {
    this.open = {
      fundId: null,
      amount: null,
    };
    this.close = {
      fundId: null,
    };
    this.ids = [];
  }
  funds: Funds[];
  records: Records[];
  open: OpenClose;
  close: OpenClose;
  panelOpenState = false;
  investRecordType = InvestRecordType;
  displayedColumns: string[] = [
    'timeStamp',
    'fundName',
    'type',
    'brfore',
    'after',
    'accrued',
    'id',
  ];
  dataSource = new MatTableDataSource();
  fundsEnum = FundsType;
  years: any;
  months: any;
  days: any;

  CarouselOptions = {
    responsive: {
      320: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
      1200: {
        items: 3,
        dots: true,
        nav: true,
      },
    },
  };
  showFunds() {
    return this.dashboardService.getFunds().subscribe(
      (res: any) => {
        console.log(res);
        this.funds = res;
        for (const i of this.funds) {
          this.years = Math.floor(i.duration / 365);
          this.months = Math.floor((i.duration % 365) / 30);
          this.days = Math.floor((i.duration % 365) % 30);
          i.yearsDisplay =
            this.years > 0
              ? this.years + (this.years === 1 ? ' year ' : ' years ')
              : '';
          i.monthsDisplay =
            this.months > 0
              ? this.months + (this.months === 1 ? ' month ' : ' months ')
              : '';
          i.daysDisplay =
            this.days > 0
              ? this.days + (this.days === 1 ? ' day' : ' days')
              : '';
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  get paginatorSizeOptions(): number[] {
    return [
      CONSTANTS.PAGINATION_LIMIT_SMALL,
      CONSTANTS.PAGINATION_LIMIT,
      CONSTANTS.PAGINATION_LIMIT_BIG,
    ];
  }

  get isAuthorized(): boolean {
    return this.authService.isAuthorized;
  }

  showRecords() {
    return this.dashboardService.getRecords().subscribe(
      (res: any) => {
        this.records = res;
        for (const i of this.records) {
          if (!this.ids.includes(i.fundId)) {
            this.ids.push(i.fundId);
            i.needButton = i.type !== InvestRecordType.Closing;
          }
        }
        this.dataSource.data = this.records;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openDialog(fund): void {
    this.open.fundId = fund.id;
    const dialogRef = this.dialog.open(DashboardModalComponent, {
      width: '500px',
      data: {
        id: this.open.fundId,
        min: fund.minimumFund,
        max: fund.maximumFund,
        name: fund.fundCurrencyShortName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.showFunds();
    });
  }
  closeDialog(closeId): void {
    const dialogRef = this.dialog.open(CloseModalComponent, {
      width: '500px',
      data: { id: closeId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.showRecords();
    });
  }
  ngOnInit() {
    this.showFunds();
    this.showRecords();
  }
}
