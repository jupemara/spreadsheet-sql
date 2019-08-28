import {Record} from './Record';
import {csv2json} from './Utils';

export abstract class BaseSpreadsheet {
  constructor(
    private readonly spreadsheetKey: string,
    private readonly worksheetName: string
  ) {}

  public query(q: string): Promise<Record[]> {
    return this.request(
      'https://spreadsheets.google.com/tq',
      this.buildRequestParameters(
        this.spreadsheetKey,
        this.worksheetName,
        q
      )
    ).then(res => {
      return csv2json(res.data).map(v => v as Record);
    });
  }

  protected abstract request(
    url: string,
    params: {[k: string]: string | number}
  ): Promise<{data: any}>

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