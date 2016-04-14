import * as request from 'request';
import * as _ from 'lodash';
import {AbstractSpreadSheet} from './AbstractSpreadSheet';
import {SpreadsheetResponseWorksheet} from './SpreadsheetResponseInterface';
import * as utils from './Utils';

export class PublicSpreadsheet extends AbstractSpreadSheet{

  constructor(spreadsheetKey: string, worksheetName: string) {
    super();
    this.spreadsheetKey = spreadsheetKey;
    this.worksheetName = worksheetName;
  }

  query(query: string) {
    query = encodeURIComponent(query);
    return new Promise((resolve, reject) => {
      request({
        url: `https://spreadsheets.google.com/tq?headers=1&key=${this.spreadsheetKey}&sheet=${this.worksheetName}&tq=${query}&tqx=out:csv`
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(utils.csv2json(body));
      });
    });
  }
}