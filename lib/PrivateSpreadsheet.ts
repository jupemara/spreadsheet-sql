import {BaseSpreadsheet} from './BaseSpreadSheet';

//TODO: not declare google api node client d.ts. See https://github.com/google/google-api-nodejs-client/issues/503 .
const OAuth2 = require('googleapis').google.auth.OAuth2;

export class PrivateSpreadsheet extends BaseSpreadsheet {

  constructor(
    spreadsheetKey: string,
    worksheetName: string,
    private readonly clientId:string,
    private readonly clientSecret:string,
    private readonly redirectUrn:string,
    private readonly refreshToken?:string
  ) {
    super(spreadsheetKey, worksheetName);
    const client = new OAuth2(this.clientId, this.clientSecret, this.redirectUrn);
    if (!!this.refreshToken) {
      client.setCredentials({
        refresh_token: this.refreshToken
      });
    }
    this.httpAgent = client;
  }
}
