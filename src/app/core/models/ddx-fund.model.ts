export interface Fund {
  id: number;
  fundCurrencyShortName: string;
  name: string;
  type: FundType;
  minimumFund: number;
  maximumFund: number;
  duration: number;
  fixedInterest: number;
  totalSupply: number;
  startDate: string;
  expirationDate: string;
  yearsDisplay?: any;
  monthsDisplay?: any;
  daysDisplay?: any;
}

export enum FundType {
  Fixed = 1,
  Flexible = 2,
}
