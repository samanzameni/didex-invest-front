export interface Funds {
  id: number;
  fundCurrencyShortName: string;
  name: string;
  type: number;
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
