/* eslint-disable prettier/prettier */

import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ReportType } from 'src/data';

export class createReportDto {
  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class createEditDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}
export class reportResponse {
  constructor(report: Partial<reportResponse>) {
    Object.assign(this, report);
  }

  id: string;
  amount: string;
  source: string;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
  type: ReportType;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }
}
