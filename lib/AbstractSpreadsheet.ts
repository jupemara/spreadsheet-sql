import * as request from 'request';

export abstract class AbstractSpreadSheet {
  protected spreadsheetKey: string;
  protected worksheetName: string;
  abstract query(query:string): Promise<Object>;

  protected promisifiedGoogleRequest(url: string, accessToken?: string): Promise<string>{
    return new Promise((resolve, reject) => {
      let params = {
        url: url
      };
      if (accessToken) {
        params['headers'] = {Authorization: accessToken}
      }

      request(params, (err, res, body) => {
        if (err) {
          reject(err);
          return
        }
        resolve(body);
      });
    });
  }
}
