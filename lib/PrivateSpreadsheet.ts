import * as lodash from 'lodash';
import {AbstractSpreadSheet} from './AbstractSpreadsheet';
import * as utils from './Utils';

//TODO: not declare google api node client d.ts. See https://github.com/google/google-api-nodejs-client/issues/503 .
const OAuth2 = require('googleapis').auth.OAuth2;

export class PrivateSpreadsheet extends AbstractSpreadSheet{

  private clientId: string;
  private clientSecret: string;
  private redirectUrn: string;
  private refreshToken: string;
  private OAuthClient: any;
  private accessToken: string;

  constructor(spreadsheetKey: string, worksheetName: string, clientId:string, clientSecret:string, redirectUrn:string, refreshToken:string) {
    super();
    this.spreadsheetKey = spreadsheetKey;
    this.worksheetName = worksheetName;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUrn = redirectUrn;
    this.refreshToken = refreshToken;

    this.OAuthClient = new OAuth2(this.clientId, this.clientSecret, this.redirectUrn);
    this.OAuthClient.setCredentials({
      refresh_token: this.refreshToken
    })
  }

  public refreshAccessToken(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.OAuthClient.refreshAccessToken((err, tokens) => {
        if (err) {
          reject(err);
          return;
        }

        this.OAuthClient.setCredentials(tokens);
        this.accessToken = tokens.access_token;
        resolve();
      });
    })
  }

  public getGvizUrl(): Promise<any> {
    return this.promisifiedGoogleRequest(`https://spreadsheets.google.com/feeds/worksheets/${this.spreadsheetKey}/private/basic?alt=json`, this.accessToken)
      .then(body => {
        return lodash.find(
          lodash.find(JSON.parse(body)['feed']['entry'], worksheet => {
            return worksheet['title']['$t'] === this.worksheetName;
          })['link'], link => {
            return /gviz/.test(link['href'])
          })['href'];
      });
  }
  query(query) {
    return this.refreshAccessToken().then(
      () => {
        return this.getGvizUrl()
      }).then(gvizUrl => {
        query = encodeURIComponent(query);
        return this.promisifiedGoogleRequest(`${gvizUrl}&headers=1&tq=${query}&tqx=out:csv`, this.accessToken)
      }).then(csv => {
        return utils.csv2json(csv);
      });
  }
}
