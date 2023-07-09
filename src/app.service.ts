/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { reportResponse } from './dtos/report.dto';

interface BodyType {
  source: string;
  amount: string;
}
interface UpdateBodyType {
  source?: string;
  amount?: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType): reportResponse[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new reportResponse(report));
  }
  getOneReport(type: ReportType, id: string): reportResponse {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new reportResponse(report);
  }
  createReports(type: string, body: BodyType): reportResponse {
    const newReport = {
      id: uuid(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return new reportResponse(newReport);
  }
  editOneReport(
    id: string,
    type: string,
    body: UpdateBodyType,
  ): reportResponse {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const editData = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    if (!editData) return;
    const reportIndex = data.report.findIndex(
      (report) => report.id === editData.id,
    );

    const report = (data.report[reportIndex] = {
      ...data.report[reportIndex],
      source: body.source,
    });

    return new reportResponse(report);
  }

  deleteOneReport(id: string): reportResponse {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1);
    return;
  }
}
