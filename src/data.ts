/* eslint-disable prettier/prettier */
export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
interface Data {
  report: {
    id: string;
    source: string;
    amount: string;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}

export const data: Data = {
  report: [
    {
      id: '1',
      source: 'Ytb',
      amount: '450',
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: '2',
      source: 'ob',
      amount: '9950',
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
    {
      id: '3',
      source: 'forex',
      amount: '4510',
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME,
    },
    {
      id: '4',
      source: 'techx',
      amount: '900',
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.EXPENSE,
    },
  ],
};
