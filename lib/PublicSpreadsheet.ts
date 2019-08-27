import {BaseSpreadsheet} from './BaseSpreadSheet';
import axios from 'axios';

export class PublicSpreadsheet extends BaseSpreadsheet {

  constructor(
    spreadsheetKey: string,
    worksheetName: string
  ) {
    super(spreadsheetKey, worksheetName);
    this.httpAgent = axios;
  }
}