import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {csv2json} from './Utils';

export class BaseSpreadsheet {
  protected httpAgent: HttpAgent;

  constructor(
    private readonly spreadsheetKey: string,
    private readonly worksheetName: string
  ) {}

  public query(q: string): Promise<{[k: string]: string | number}[]> {
    return this.httpAgent.request({
      method: 'GET',
      url: 'https://spreadsheets.google.com/tq',
      params: this.buildRequestParameters(
        this.spreadsheetKey,
        this.worksheetName,
        q
      )
    }).then(res => {
      return csv2json(res.data);
    });
  }
  private buildRequestParameters(
    spreadsheetKey: string,
    worksheetName: string,
    query: string
  ): {[k: string]: string | number} {
    return {
      headers: 1,
      key: spreadsheetKey,
      sheet: worksheetName,
      tq: query,
      tqx: 'out:csv'
    };
  }
}

interface HttpAgent {
  request(AxiosRequestConfig): Promise<AxiosResponse>;
}