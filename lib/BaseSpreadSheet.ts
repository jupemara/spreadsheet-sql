import {Record} from './Record';
import {Csv} from './Csv';

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
      return new Csv(res.data).toJson();
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