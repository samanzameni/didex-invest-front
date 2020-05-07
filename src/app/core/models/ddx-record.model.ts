export interface Record {
  accrued: number;
  after: number;
  brfore: number;
  fundName: string;
  fundId: number;
  id: number;
  timeStamp: Date;
  type: RecordType;
  needButton?: boolean;
}

export enum RecordType {
  Opening = 1,
  Closing = 2,
  Interest = 3,
}
