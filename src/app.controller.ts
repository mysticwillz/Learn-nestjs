/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { log } from 'console';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { AppService } from './app.service';
import {
  createEditDto,
  createReportDto,
  reportResponse,
} from './dtos/report.dto';
@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): reportResponse[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }
  @Get(':id')
  getOneReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): reportResponse {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getOneReport(reportType, id);
  }
  @Post()
  createReports(
    @Body() body: createReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    return this.appService.createReports(type, body);
  }
  @Put(':id')
  editOneReport(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() body: createEditDto,
  ): reportResponse {
    return this.appService.editOneReport(id, type, body);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteOneReport(@Param('id', ParseUUIDPipe) id: string): reportResponse {
    return this.appService.deleteOneReport(id);
  }
}
