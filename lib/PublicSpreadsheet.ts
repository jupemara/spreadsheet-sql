import * as utils from './Utils';
import axios from 'axios';
import * as querystring from 'querystring';

export class PublicSpreadsheet {

  constructor(
    private readonly spreadsheetKey: string,
    private readonly worksheetName: string
  ) {}

  public query(q: string) {
    const qs = {
      headers: '1',
      key: this.spreadsheetKey,
      sheet: this.worksheetName,
      tq: q,
      tqx: 'out:csv',
    };
    return axios.get(
      `https://spreadsheets.google.com/tq?${querystring.stringify(qs)}`
    ).then(res =>　{
      return utils.csv2json(res.data);
    });
  }
}