import {BaseSpreadsheet} from './BaseSpreadSheet';
import axios from 'axios';

export class PublicSpreadsheet extends BaseSpreadsheet {

  constructor(
    spreadsheetKey: string,
    worksheetName: string
  ) {
    super(spreadsheetKey, worksheetName);
  }

  protected request(
    url: string,
    params: {[k: string]: string | number}
  ): Promise<{data: any}> {
    return axios.request({url, params});
  }
}