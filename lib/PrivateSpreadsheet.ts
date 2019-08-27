import * as utils from './Utils';

//TODO: not declare google api node client d.ts. See https://github.com/google/google-api-nodejs-client/issues/503 .
const OAuth2 = require('googleapis').google.auth.OAuth2;

export class PrivateSpreadsheet{

  private readonly oauthClient: any;

  constructor(
    private readonly spreadsheetKey: string,
    private readonly worksheetName: string,
    private readonly clientId:string,
    private readonly clientSecret:string,
    private readonly redirectUrn:string,
    private readonly refreshToken?:string
  ) {
    this.oauthClient = new OAuth2(this.clientId, this.clientSecret, this.redirectUrn);
    if (!!this.refreshToken) {
      this.oauthClient.setCredentials({
        refresh_token: this.refreshToken
      });
    }
  }

  public query(q: string) {
    const qs = {
      headers: 1,
      key: this.spreadsheetKey,
      sheet: this.worksheetName,
      tq: q,
      tqx: 'out:csv'
    };
    return this.oauthClient.request({
        method: 'GET',
        url: `https://spreadsheets.google.com/tq`,
        params: qs
    }).then(res => {
      return utils.csv2json(res.data);
    });
  }
}
