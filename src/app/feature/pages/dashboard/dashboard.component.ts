import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AuthService } from '@core/services';
import { DashboardRESTService } from '@core/services/REST';
import { CONSTANTS } from '@core/util/constants';

import {
  Fund,
  FundType,
  Record,
  RecordType,
  OpenInvestmentData,
  CloseInvestmentData,
} from '../../../core/models';

import { DashboardModalComponent } from '@feature/components';
import { CloseModalComponent } from '@feature/components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
  }

  ids: number[];
  needUpdate: boolean;
  centerCarousels: boolean;
  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardRESTService,
    private authService: AuthService,
    private changeDetectorRefs: ChangeDetectorRef
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
  funds: Fund[];
  records: Record[];
  open: OpenInvestmentData;
  close: CloseInvestmentData;
  panelOpenState = false;
  investRecordType = RecordType;
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
  fundsEnum = FundType;
  years: any;
  months: any;
  days: any;

  CarouselOptions = {

    responsive: {
      320: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
        dots: true,
        nav: false,
      },
      1000: {
        items: 2,
        dots: true,
        nav: true,
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
        this.funds = res;
        console.log(res);
        if (this.funds.length <= 2) {
          this.centerCarousels = true;
        }
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
        this.changeDetectorRefs.detectChanges();
      },
      (err) => {
        // console.log(err);
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
    this.ids = [];
    return this.dashboardService.getRecords().subscribe(
      (res: any) => {
        this.records = res;
        for (const i of this.records) {
          if (!this.ids.includes(i.fundId)) {
            this.ids.push(i.fundId);
            i.needButton = i.type !== RecordType.Closing;
          }
        }
        this.dataSource.data = this.records;
        // console.log(this.records);
        // console.log(this.paginator);
        this.changeDetectorRefs.detectChanges();
      },
      (err) => {
        // console.log(err);
      }
    );
  }
  openDialog(fund): void {
    console.log(fund);
    this.open.fundId = fund.id;
    const dialogRef = this.dialog.open(DashboardModalComponent, {
      width: '500px',
      autoFocus: false,
      data: {
        id: this.open.fundId,
        min: fund.minimumFund,
        max: fund.maximumFund,
        name: fund.fundCurrencyShortName,
        needUpdate: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result && result.data.needUpdate === true) {
        this.showRecords();
        this.showFunds();
      }
    });
  }
  closeDialog(closeId): void {
    const dialogRef = this.dialog.open(CloseModalComponent, {
      width: '500px',
      data: { id: closeId, needUpdate: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!!result && result.data.needUpdate === true) {
        this.showRecords();
        this.showFunds();
      }
    });
  }

  ngOnInit() {
    this.showFunds();
    this.showRecords();
  }
}
